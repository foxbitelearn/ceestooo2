'use client';

import { STUDENTS } from '@/lib/students';

interface StudentSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

export function StudentSelect({ label = "Who is this for?", className, ...props }: StudentSelectProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="font-handwritten text-2xl text-ink font-bold ml-1">{label}</label>
            <div className="relative">
                <select
                    className={`appearance-none w-full bg-paper border-2 border-ink/20 rounded-lg px-4 py-3 font-sans text-lg focus:outline-none focus:border-gold transition-colors cursor-pointer ${className}`}
                    defaultValue=""
                    {...props}
                >
                    <option value="" disabled>Select a classmate...</option>
                    {STUDENTS.map((student) => (
                        <option key={student} value={student}>
                            {student}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
