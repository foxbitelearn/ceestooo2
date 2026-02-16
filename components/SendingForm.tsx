'use client';

import { useState, useActionState } from 'react';
import { sendMessageAction, sendReviewAction } from '@/app/actions';
import { StudentSelect } from './ui/StudentSelect';
import { TEACHERS } from '@/lib/teachers';

const initialState = {
    success: '',
    error: '',
};

export function SendingForm() {
    const [type, setType] = useState<'student' | 'teacher'>('student');
    const [messageState, messageAction, isMessagePending] = useActionState(sendMessageAction, initialState);
    const [reviewState, reviewAction, isReviewPending] = useActionState(sendReviewAction, initialState);

    const isPending = type === 'student' ? isMessagePending : isReviewPending;
    const state = type === 'student' ? messageState : reviewState;
    const action = type === 'student' ? messageAction : reviewAction;

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-ink/10 relative overflow-hidden transition-all duration-500">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-paper opacity-50 pointer-events-none mix-blend-multiply"></div>

            {/* Toggle */}
            <div className="relative z-10 flex justify-center mb-6 bg-paper-dark p-1 rounded-lg">
                <button
                    onClick={() => setType('student')}
                    className={`px-4 py-2 rounded-md font-bold transition-all w-1/2 ${type === 'student' ? 'bg-ink text-paper shadow-md' : 'text-ink/60 hover:text-ink'}`}
                >
                    To Student
                </button>
                <button
                    onClick={() => setType('teacher')}
                    className={`px-4 py-2 rounded-md font-bold transition-all w-1/2 ${type === 'teacher' ? 'bg-ink text-paper shadow-md' : 'text-ink/60 hover:text-ink'}`}
                >
                    Review Teacher
                </button>
            </div>

            <form action={action} className="relative z-10 space-y-6">
                <div className="text-center mb-2">
                    <h2 className="font-handwritten text-4xl text-ink font-bold">
                        {type === 'student' ? "Send a Message" : "Teacher Review"}
                    </h2>
                    <p className="font-serif text-ink/70 italic text-sm">
                        {type === 'student'
                            ? "\"Words are all we allow ourselves to keep...\""
                            : "\"Teachers plant seeds that grow forever...\""}
                    </p>
                </div>

                {state?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-pulse" role="alert">
                        <strong className="font-bold">Sent!</strong>
                        <span className="block sm:inline"> {state.success}</span>
                    </div>
                )}

                {state?.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {state.error}</span>
                    </div>
                )}

                {type === 'student' ? (
                    <StudentSelect name="to" required />
                ) : (
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-handwritten text-2xl text-ink font-bold ml-1">Select Teacher</label>
                        <div className="relative">
                            <select
                                name="teacher"
                                required
                                className="appearance-none w-full bg-paper border-2 border-ink/20 rounded-lg px-4 py-3 font-sans text-lg focus:outline-none focus:border-gold transition-colors cursor-pointer"
                                defaultValue=""
                            >
                                <option value="" disabled>Select a teacher...</option>
                                {TEACHERS.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="font-handwritten text-2xl text-ink font-bold ml-1">
                        {type === 'student' ? "Your Message" : "Your Review"}
                    </label>
                    <textarea
                        name="content"
                        required
                        className="w-full bg-paper border-2 border-ink/20 rounded-lg p-4 font-handwritten text-2xl h-40 focus:outline-none focus:border-gold resize-none leading-relaxed transition-colors"
                        placeholder={type === 'student' ? "Write something memorable..." : "Share your honest thoughts..."}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-ink text-paper font-bold text-xl py-4 rounded-lg hover:bg-gold hover:text-ink transition-all shadow-md transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Sending...' : (type === 'student' ? 'Send Anonymously' : 'Post Review')}
                </button>
            </form>
        </div>
    );
}
