
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMessagesForUser } from '@/lib/storage';
import { MessageCard } from '@/components/ui/MessageCard';

export default async function MessagesPage() {
    const cookieStore = await cookies();
    const username = cookieStore.get('session_user')?.value;

    if (!username) {
        redirect('/login');
    }

    const messages = await getMessagesForUser(username);

    return (
        <div className="min-h-screen bg-paper px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center md:text-left relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="font-handwritten text-4xl md:text-6xl text-ink font-bold inline-block border-b-4 border-gold/50 rotate-[-1deg] pb-2">
                                Hey, {username}!
                            </h1>
                            <p className="mt-4 text-xl font-serif text-ink/70 max-w-2xl">
                                Here are the anonymous notes from your classmates. Or maybe secret admirers? Who knows...
                            </p>
                        </div>

                        {username === "DHRUPAD" && (
                            <a href="/admin" className="px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-transform hover:scale-105 animate-pulse">
                                👑 Admin Dashboard
                            </a>
                        )}
                    </div>
                </header>

                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-xl border-dashed border-2 border-ink/20">
                        <div className="text-6xl mb-4">📫</div>
                        <h2 className="font-handwritten text-3xl text-ink/60 mb-2">No messages yet...</h2>
                        <p className="text-ink/50 max-w-md text-center">
                            Maybe send some anonymous messages to others first? Karma works in mysterious ways!
                        </p>
                        <a href="/" className="mt-6 font-bold text-ink hover:text-gold underline decoration-wavy decoration-gold">
                            Go Send a Message
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min">
                        {messages.map((msg, index) => {
                            // Deterministic variance based on index or content length
                            const variants: ('yellow' | 'blue' | 'pink' | 'green')[] = ['yellow', 'blue', 'pink', 'green'];
                            const variant = variants[(index + msg.content.length) % variants.length];
                            const rotation = (index % 2 === 0 ? 1 : -1) * ((index % 5) + 1); // Slight rotation based on index

                            return (
                                <div key={msg.id} style={{ transform: `rotate(${rotation}deg)` }} className="transition-transform hover:z-10 hover:scale-105 duration-300">
                                    <MessageCard
                                        content={msg.content}
                                        timestamp={msg.timestamp}
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
