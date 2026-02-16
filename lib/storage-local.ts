
import fs from 'fs';
import path from 'path';
import { User, Message, Review } from './storage-db'; // Import types from DB version for consistency

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure setup
const ensureFiles = () => {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
    if (!fs.existsSync(REVIEWS_FILE)) fs.writeFileSync(REVIEWS_FILE, JSON.stringify([]));
};

function readJson<T>(filePath: string): T {
    try {
        ensureFiles();
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) as T;
    } catch (error) {
        return [] as unknown as T;
    }
}

function writeJson<T>(filePath: string, data: T): void {
    ensureFiles();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ASYNC WRAPPERS to match Prisma API

// Users
export const getUsers = async () => readJson<any[]>(USERS_FILE);

export const saveUser = async (user: { name: string; passcode: string }) => {
    const users = await getUsers();
    const existingIndex = users.findIndex(u => u.name === user.name);
    if (existingIndex >= 0) return users[existingIndex];

    users.push({ ...user, trackingIds: [] });
    writeJson(USERS_FILE, users);
    return user;
};

export const linkTrackingId = async (username: string, trackingId: string) => {
    const users = await getUsers();
    const user = users.find(u => u.name === username);
    if (user) {
        if (!user.trackingIds) user.trackingIds = [];
        if (!user.trackingIds.includes(trackingId)) {
            user.trackingIds.push(trackingId);
            writeJson(USERS_FILE, users);
        }
    }
};

export const verifyUser = async (name: string, passcode: string): Promise<boolean> => {
    const users = await getUsers();
    const user = users.find(u => u.name === name);
    return user ? user.passcode === passcode : false;
};

// Messages
export const getMessages = async () => {
    const msgs = readJson<any[]>(MESSAGES_FILE);
    return msgs.sort((a, b) => b.timestamp - a.timestamp);
};

export const getMessagesForUser = async (username: string) => {
    const msgs = await getMessages();
    return msgs.filter(m => m.to === username);
};

export const saveMessage = async (to: string, content: string, trackingId?: string) => {
    const messages = await getMessages();
    const newMessage = {
        id: crypto.randomUUID(),
        to,
        content,
        timestamp: Date.now(),
        trackingId,
    };
    messages.push(newMessage);
    writeJson(MESSAGES_FILE, messages);
    return newMessage;
};

// Reviews
export const getReviews = async () => {
    const reviews = readJson<any[]>(REVIEWS_FILE);
    return reviews.sort((a, b) => b.timestamp - a.timestamp);
};

export const getReviewsForTeacher = async (teacher: string) => {
    const reviews = await getReviews();
    return reviews.filter(r => r.teacher === teacher);
};

export const saveReview = async (teacher: string, content: string) => {
    const reviews = await getReviews();
    const newReview = {
        id: crypto.randomUUID(),
        teacher,
        content,
        timestamp: Date.now(),
    };
    reviews.push(newReview);
    writeJson(REVIEWS_FILE, reviews);
    return newReview;
};

// Admin
export const getFullDatabase = async () => {
    const users = await getUsers();
    const messages = await getMessages();
    const reviews = await getReviews();

    const trackingMap: Record<string, string> = {};
    users.forEach(u => {
        u.trackingIds?.forEach((tid: string) => {
            trackingMap[tid] = u.name;
        });
    });

    const enrichedMessages = messages.map(m => ({
        ...m,
        likelySentBy: m.trackingId ? trackingMap[m.trackingId] || "Unknown (Not Logged In Yet)" : "Unknown"
    }));

    return { users, messages: enrichedMessages, reviews };
};
