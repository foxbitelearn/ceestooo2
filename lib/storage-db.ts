
import { prisma } from '@/lib/prisma';
import { User as PrismaUser, Message as PrismaMessage, Review as PrismaReview } from '@prisma/client';

export type User = PrismaUser;
export type Message = PrismaMessage & { likelySentBy?: string };
export type Review = PrismaReview;

// Users API
export const getUsers = async () => {
    return await prisma.user.findMany();
};

export const saveUser = async (user: { name: string; passcode: string }) => {
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { name: user.name } });
    if (existing) {
        // Update logic if needed, but for now we just return
        return existing;
    }
    return await prisma.user.create({
        data: {
            name: user.name,
            passcode: user.passcode,
            trackingIds: []
        }
    });
};

export const linkTrackingId = async (username: string, trackingId: string) => {
    const user = await prisma.user.findUnique({ where: { name: username } });
    if (user && !user.trackingIds.includes(trackingId)) {
        await prisma.user.update({
            where: { name: username },
            data: {
                trackingIds: {
                    push: trackingId
                }
            }
        });
    }
};

export const verifyUser = async (name: string, passcode: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({ where: { name } });
    if (!user) return false;
    return user.passcode === passcode;
};

// Messages API
export const getMessages = async () => {
    const msgs = await prisma.message.findMany({ orderBy: { timestamp: 'desc' } });
    return msgs.map(m => ({
        ...m,
        timestamp: m.timestamp.getTime() // Convert DateTime to number for frontend
    }));
};

export const getMessagesForUser = async (username: string) => {
    const msgs = await prisma.message.findMany({
        where: { to: username },
        orderBy: { timestamp: 'desc' }
    });
    return msgs.map(m => ({
        ...m,
        timestamp: m.timestamp.getTime()
    }));
};

export const saveMessage = async (to: string, content: string, trackingId?: string) => {
    const msg = await prisma.message.create({
        data: {
            to,
            content,
            trackingId
        }
    });
    return {
        ...msg,
        timestamp: msg.timestamp.getTime()
    };
};

// Reviews API
export const getReviews = async () => {
    const reviews = await prisma.review.findMany({ orderBy: { timestamp: 'desc' } });
    return reviews.map(r => ({
        ...r,
        timestamp: r.timestamp.getTime()
    }));
};

export const getReviewsForTeacher = async (teacher: string) => {
    const reviews = await prisma.review.findMany({
        where: { teacher },
        orderBy: { timestamp: 'desc' }
    });
    return reviews.map(r => ({
        ...r,
        timestamp: r.timestamp.getTime()
    }));
};

export const saveReview = async (teacher: string, content: string) => {
    const review = await prisma.review.create({
        data: {
            teacher,
            content
        }
    });
    return {
        ...review,
        timestamp: review.timestamp.getTime()
    };
};

// Admin API
export const getFullDatabase = async () => {
    const users = await prisma.user.findMany();
    const messages = await prisma.message.findMany();
    const reviews = await prisma.review.findMany();

    // Map trackingIds to Users for easy lookup
    const trackingMap: Record<string, string> = {};
    users.forEach(u => {
        u.trackingIds.forEach(tid => {
            trackingMap[tid] = u.name;
        });
    });

    const enrichedMessages = messages.map(m => ({
        ...m,
        timestamp: m.timestamp.getTime(),
        likelySentBy: m.trackingId ? trackingMap[m.trackingId] || "Unknown (Not Logged In Yet)" : "Unknown"
    }));

    const formattedReviews = reviews.map(r => ({
        ...r,
        timestamp: r.timestamp.getTime()
    }));

    return {
        users,
        messages: enrichedMessages,
        reviews: formattedReviews,
    };
};
