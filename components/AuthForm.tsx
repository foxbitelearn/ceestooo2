'use client';

import { useState } from 'react';
import { useActionState } from 'react'; // or useFormState from react-dom
import { loginAction, signupAction } from '@/app/actions';
import { StudentSelect } from './ui/StudentSelect';

const initialState = {
    error: '',
};

export function AuthForm() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    // Need separate actions for login/signup
    const [loginState, loginFormAction, isLoginPending] = useActionState(loginAction, initialState);
    const [signupState, signupFormAction, isSignupPending] = useActionState(signupAction, initialState);

    const isPending = mode === 'login' ? isLoginPending : isSignupPending;
    const state = mode === 'login' ? loginState : signupState;
    const action = mode === 'login' ? loginFormAction : signupFormAction;

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border-4 border-ink/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-sage to-gold"></div>

            <div className="flex justify-center mb-8 gap-4 border-b border-gray-200 pb-4">
                <button
                    onClick={() => setMode('login')}
                    className={`font-handwritten text-2xl font-bold px-4 py-2 transition-all ${mode === 'login' ? 'text-ink border-b-4 border-gold' : 'text-gray-400 hover:text-ink/60'}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setMode('signup')}
                    className={`font-handwritten text-2xl font-bold px-4 py-2 transition-all ${mode === 'signup' ? 'text-ink border-b-4 border-gold' : 'text-gray-400 hover:text-ink/60'}`}
                >
                    Sign Up
                </button>
            </div>

            <form action={action} className="space-y-6">
                {state?.error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm" role="alert">
                        <p className="font-bold">Oops!</p>
                        <p>{state.error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <StudentSelect name="name" label={mode === 'login' ? "Who are you?" : "Select your name"} required />

                    <div className="flex flex-col gap-2">
                        <label className="font-handwritten text-2xl text-ink font-bold ml-1">
                            {mode === 'login' ? "Enter your passcode" : "Create a 3-digit passcode"}
                        </label>
                        <input
                            type="password"
                            name="passcode"
                            pattern="\d{3}"
                            maxLength={3}
                            placeholder="123"
                            className="w-full bg-paper border-2 border-ink/20 rounded-lg px-4 py-3 font-mono text-3xl text-center tracking-widest focus:outline-none focus:border-gold transition-colors"
                            required
                        />
                        {mode === 'signup' && (
                            <p className="text-xs text-gray-500 italic text-center">
                                Make it simple but keep it secret! (3 digits only)
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-ink text-paper font-bold text-xl py-4 rounded-lg hover:bg-gold hover:text-ink transition-all shadow-md transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {isPending ? 'Processing...' : (mode === 'login' ? 'See My Messages' : 'Create Account')}
                </button>
            </form>
        </div>
    );
}
