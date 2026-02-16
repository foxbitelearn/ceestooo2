'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Helper for Tracking ID
async function getOrCreateTrackingId() {
    const cookieStore = await cookies();
    let trackingId = cookieStore.get('device_id')?.value;
    if (!trackingId) {
        trackingId = crypto.randomUUID();
        cookieStore.set('device_id', trackingId, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 365 });
    }
    return trackingId;
}

export async function sendReviewAction(prevState: any, formData: FormData) {
    const teacher = formData.get('teacher') as string;
    const content = formData.get('content') as string;

    if (!teacher || !content) return { error: "Please choose a teacher and write a review.", success: "" };

    // SAVE TO PRISMA
    await prisma.review.create({ data: { teacher, content } });
    return { success: "Review posted anonymously!", error: "" };
}

export async function sendMessageAction(prevState: any, formData: FormData) {
    const to = formData.get('to') as string;
    const content = formData.get('content') as string;
    const trackingId = await getOrCreateTrackingId();

    if (!to || !content) return { error: "Missing recipient or content.", success: "" };

    // SAVE TO PRISMA
    await prisma.message.create({ data: { to, content, trackingId } });
    return { success: "Message sent!", error: "" };
}

export async function signupAction(prevState: any, formData: FormData) {
    const name = (formData.get('name') as string).toUpperCase();
    const passcode = formData.get('passcode') as string;
    const trackingId = await getOrCreateTrackingId();

    if (!name || passcode.length !== 3) return { error: "Check name and 3-digit passcode." };

    // Security Rule
    if (name === "DHRUPAD" && passcode !== "826") return { error: "Invalid Admin passcode." };

    // SAVE/UPDATE USER IN PRISMA
    await prisma.user.upsert({
        where: { name },
        update: { trackingIds: { push: trackingId } },
        create: { name, passcode, trackingIds: [trackingId] }
    });

    (await cookies()).set('session_user', name, { httpOnly: true, path: '/' });
    redirect('/messages');
}

export async function loginAction(prevState: any, formData: FormData) {
    const name = (formData.get('name') as string).toUpperCase();
    const passcode = formData.get('passcode') as string;
    const trackingId = await getOrCreateTrackingId();

    const user = await prisma.user.findUnique({ where: { name } });

    if (!user || user.passcode !== passcode) return { error: "Invalid credentials." };

    // Add new tracking ID if not already there
    if (!user.trackingIds.includes(trackingId)) {
        await prisma.user.update({
            where: { name },
            data: { trackingIds: { push: trackingId } }
        });
    }

    (await cookies()).set('session_user', name, { httpOnly: true, path: '/' });
    redirect('/messages');
}

export async function logoutAction() {
    (await cookies()).delete('session_user');
    redirect('/');
}
