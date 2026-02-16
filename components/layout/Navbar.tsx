import Link from 'next/link';
import { cookies } from 'next/headers';
import { logoutAction } from '@/app/actions';

export async function Navbar() {
    const cookieStore = await cookies();
    const user = cookieStore.get('session_user')?.value;

    return (
        <nav className="w-full bg-paper-dark border-b-2 border-ink/10 py-4 px-6 fixed top-0 left-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="font-handwritten text-3xl font-bold text-ink hover:text-gold transition-colors">
                    Farewell Class of '26
                </Link>

                <div className="flex gap-6 items-center font-serif text-lg">
                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                    <Link href="/teachers" className="hover:text-gold transition-colors">Teachers</Link>
                    <Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link>

                    {user ? (
                        <>
                            <Link href="/messages" className="font-bold text-ink hover:text-gold transition-colors">
                                My Messages ({user})
                            </Link>
                            <form action={logoutAction}>
                                <button type="submit" className="text-sm border border-ink/30 px-3 py-1 rounded hover:bg-ink hover:text-paper transition-all">
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-ink text-paper px-4 py-2 rounded-lg font-bold hover:bg-gold transition-colors shadow-md transform hover:-translate-y-0.5"
                        >
                            See My Messages
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
