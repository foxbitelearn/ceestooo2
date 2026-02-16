
import { MessageCard } from '@/components/ui/MessageCard';
import { getReviewsForTeacher } from '@/lib/storage';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TeacherReviewsPage({ params }: { params: Promise<{ teacher: string }> }) {
    const { teacher } = await params;
    const decodedTeacher = decodeURIComponent(teacher);
    const reviews = await getReviewsForTeacher(decodedTeacher);

    // Simple validation to ensure teacher exists in our list (optional, but good practice)
    // For now, we'll just show what we have.

    return (
        <div className="min-h-screen bg-paper">
            <div className="container mx-auto px-4 py-8">
                <Link href="/teachers" className="inline-flex items-center text-ink/60 hover:text-ink mb-8 group transition-colors">
                    <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Teachers
                </Link>

                <header className="mb-12 text-center">
                    <h1 className="font-handwritten text-5xl md:text-7xl text-ink font-bold drop-shadow-sm rotate-[-1deg] mb-2">
                        {decodedTeacher}
                    </h1>
                    <p className="font-serif text-lg text-ink/70 italic">
                        "To the world you may be just a teacher, but to your students you are a hero."
                    </p>
                </header>

                {reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-xl border-dashed border-2 border-ink/20">
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="font-handwritten text-3xl text-ink/60 mb-2">No reviews yet...</h2>
                        <p className="text-ink/50 max-w-md text-center">
                            Be the first to write something nice about {decodedTeacher}!
                        </p>
                        <Link href="/" className="mt-6 font-bold text-ink hover:text-gold underline decoration-wavy decoration-gold">
                            Write a Review
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, index) => {
                            // Deterministic styling
                            const variants: ('yellow' | 'blue' | 'pink' | 'green')[] = ['pink', 'green', 'yellow', 'blue'];
                            const variant = variants[(index + review.content.length) % variants.length];
                            const rotation = (index % 2 === 0 ? 1 : -1) * ((index % 3) + 1);

                            return (
                                <div key={review.id} style={{ transform: `rotate(${rotation}deg)` }} className="transition-transform hover:z-10 hover:scale-105 duration-300">
                                    <MessageCard
                                        content={review.content}
                                        timestamp={review.timestamp}
                                        variant={variant}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
