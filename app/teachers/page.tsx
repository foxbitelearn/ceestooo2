
import { TEACHERS } from '@/lib/teachers';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';

export default function TeachersPage() {
    return (
        <div className="min-h-screen bg-paper">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-12 text-center">
                    <h1 className="font-handwritten text-6xl text-ink font-bold drop-shadow-sm rotate-1 mb-4">
                        Our Mentors
                    </h1>
                    <p className="font-serif text-xl text-ink/70 italic">
                        "A good teacher can inspire hope, ignite the imagination, and instill a love of learning."
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {TEACHERS.map((teacher, index) => (
                        <Link
                            key={teacher}
                            href={`/teachers/${encodeURIComponent(teacher)}`}
                            className="block group"
                        >
                            <div className="bg-white border-2 border-ink/10 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-gold transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg className="w-16 h-16 text-ink" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <h2 className="font-handwritten text-3xl text-ink font-bold mb-2 group-hover:text-gold transition-colors">
                                    {teacher}
                                </h2>
                                <p className="font-bold text-ink/40 text-sm uppercase tracking-wider">
                                    View Reviews &rarr;
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
