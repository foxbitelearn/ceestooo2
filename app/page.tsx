import { Navbar } from '@/components/layout/Navbar';
import { SendingForm } from '@/components/SendingForm';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get('session_user')?.value;

  return (
    <main className="min-h-screen bg-paper bg-repeat relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-sage/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-12 relative z-10">

        {/* Helper Link for Gallery */}
        <div className="absolute top-4 right-4 md:hidden">
          <Link href="/gallery" className="text-sm underline text-ink/60 hover:text-ink">View Gallery</Link>
        </div>

        <div className="text-center space-y-4 max-w-2xl animate-fade-in-up">
          <h1 className="font-handwritten text-6xl md:text-8xl text-ink font-bold drop-shadow-sm rotate-[-2deg]">
            Say it before we part...
          </h1>
          <p className="font-serif text-xl md:text-2xl text-ink/80 leading-relaxed italic">
            "We laughed, we cried, we made memories. Now write your final words (or send a secret crush note) anonymously!"
          </p>
        </div>

        <div className="w-full relative">
          <SendingForm />
        </div>

        {/* Call to Action for Login */}
        <div className="mt-8 text-center space-y-4">
          <p className="font-handwritten text-3xl text-ink/90">
            Received a message?
          </p>
          {!user ? (
            <Link
              href="/login"
              className="inline-block bg-white border-2 border-ink text-ink font-bold text-xl px-8 py-3 rounded-full hover:bg-ink hover:text-white transition-all transform hover:scale-105 shadow-lg"
            >
              See What Others Wrote To You
            </Link>
          ) : (
            <Link
              href="/messages"
              className="inline-block bg-gold border-2 border-ink/20 text-ink font-bold text-xl px-8 py-3 rounded-full hover:bg-gold-light transition-all transform hover:scale-105 shadow-lg"
            >
              Go to Your Dashboard
            </Link>
          )}

          <div className="mt-12">
            <Link href="/gallery" className="text-ink/50 hover:text-ink/80 transition-colors font-serif italic text-sm border-b border-ink/20 pb-1">
              Or browse our class memories &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
