
import * as dbStorage from './storage-db';
import * as localStorage from './storage-local';

export type { User, Message, Review } from './storage-db';

// Default to 'local' if not specified, or if specified as 'local'
const USE_DB = process.env.STORAGE_MODE === 'db';

console.log(`[Storage] Using ${USE_DB ? 'Database (Prisma)' : 'Local Files (JSON)'} storage.`);

export const getUsers = USE_DB ? dbStorage.getUsers : localStorage.getUsers;
export const saveUser = USE_DB ? dbStorage.saveUser : localStorage.saveUser;
export const linkTrackingId = USE_DB ? dbStorage.linkTrackingId : localStorage.linkTrackingId;
export const verifyUser = USE_DB ? dbStorage.verifyUser : localStorage.verifyUser;
export const getMessages = USE_DB ? dbStorage.getMessages : localStorage.getMessages;
export const getMessagesForUser = USE_DB ? dbStorage.getMessagesForUser : localStorage.getMessagesForUser;
export const saveMessage = USE_DB ? dbStorage.saveMessage : localStorage.saveMessage;
export const getReviews = USE_DB ? dbStorage.getReviews : localStorage.getReviews;
export const getReviewsForTeacher = USE_DB ? dbStorage.getReviewsForTeacher : localStorage.getReviewsForTeacher;
export const saveReview = USE_DB ? dbStorage.saveReview : localStorage.saveReview;
export const getFullDatabase = USE_DB ? dbStorage.getFullDatabase : localStorage.getFullDatabase;
