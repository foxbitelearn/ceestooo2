'use server';

import { saveMessage, saveUser, verifyUser, User, saveReview, linkTrackingId } from '@/lib/storage';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function sendReviewAction(prevState: any, formData: FormData) {
    const teacher = formData.get('teacher') as string;
    const content = formData.get('content') as string;

    if (!teacher || !content) {
        return { error: "Please choose a teacher and write a review.", success: "" };
    }

    await saveReview(teacher, content);
    return { success: "Review posted anonymously! (Visible on the Teachers page)", error: "" };
}

export async function sendMessageAction(prevState: any, formData: FormData) {
    const to = formData.get('to') as string;
    const content = formData.get('content') as string;
    const cookieStore = await cookies();

    if (!to || !content) {
        return { error: "Please choose a recipient and write a message.", success: "" };
    }

    // Get or Create Tracking ID
    let trackingId = cookieStore.get('device_id')?.value;
    if (!trackingId) {
        trackingId = crypto.randomUUID();
        cookieStore.set('device_id', trackingId, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 365 }); // 1 year
    }

    await saveMessage(to, content, trackingId);
    return { success: "Message sent locally! (Note: Only visible to logged-in recipient)", error: "" };
}

export async function signupAction(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const passcode = formData.get('passcode') as string;

    if (!name || !passcode || passcode.length !== 3) {
        return { error: "Name is required and passcode must be 3 digits." };
    }

    // Special Security Rule for Creator
    if (name === "DHRUPAD" && passcode !== "826") {
        return { error: "This name is reserved. If you are DHRUPAD, please enter the correct creator passcode." };
    }

    // Create or update user
    await saveUser({ name, passcode });

    // Link Tracking ID
    const cookieStore = await cookies();
    const trackingId = cookieStore.get('device_id')?.value;
    if (trackingId) {
        await linkTrackingId(name, trackingId);
    }

    // Set session cookie
    cookieStore.set('session_user', name, { httpOnly: true, path: '/' });

    // Redirect to dashboard
    redirect('/messages');
}

export async function loginAction(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const passcode = formData.get('passcode') as string;

    if (!name || !passcode) {
        return { error: "Name and passcode are required." };
    }

    // Special Security Rule for Creator
    if (name === "DHRUPAD" && passcode !== "826") {
        return { error: "Invalid passcode for Admin." };
    }

    const isValid = await verifyUser(name, passcode);

    if (!isValid) {
        return { error: "Invalid name or passcode." };
    }

    // Session cookie
    const cookieStore = await cookies();

    // Link Tracking ID (if logging in again)
    const trackingId = cookieStore.get('device_id')?.value;
    if (trackingId) {
        await linkTrackingId(name, trackingId);
    }

    cookieStore.set('session_user', name, { httpOnly: true, path: '/' });

    redirect('/messages');
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('session_user');
    redirect('/');
}
