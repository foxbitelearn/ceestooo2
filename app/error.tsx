'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-paper text-ink p-4">
            <h2 className="text-4xl font-handwritten font-bold mb-4">Something went wrong!</h2>
            <p className="mb-4 bg-red-100 p-4 rounded border border-red-300 font-mono text-sm max-w-lg overflow-auto">
                {error.message || "Unknown error"}
            </p>
            <button
                onClick={() => reset()}
                className="px-6 py-3 bg-ink text-paper rounded-lg font-bold hover:bg-gold transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
