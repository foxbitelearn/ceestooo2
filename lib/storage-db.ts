// lib/storage.ts
import * as dbStorage from './storage-db';

// Explicitly export database types
export type { User, Message, Review } from './storage-db';

// FORCE Database usage for production stability
const USE_DB = true; 

console.log(`[Storage] Production Mode: Using Database (Prisma).`);

// Exporting only database functions to prevent file-system crashes
export const getUsers = dbStorage.getUsers;
export const saveUser = dbStorage.saveUser;
export const linkTrackingId = dbStorage.linkTrackingId;
export const verifyUser = dbStorage.verifyUser;
export const getMessages = dbStorage.getMessages;
export const getMessagesForUser = dbStorage.getMessagesForUser;
export const saveMessage = dbStorage.saveMessage;
export const getReviews = dbStorage.getReviews;
export const getReviewsForTeacher = dbStorage.getReviewsForTeacher;
export const saveReview = dbStorage.saveReview;
export const getFullDatabase = dbStorage.getFullDatabase;
