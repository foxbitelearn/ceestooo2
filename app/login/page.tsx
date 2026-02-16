
import { AuthForm } from '@/components/AuthForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-paper flex items-center justify-center relative overscroll-none px-4 py-8">
            {/* Background decorations */}
            <div className="absolute top-10 left-10 w-48 h-48 bg-gold/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-sage/10 rounded-full blur-2xl"></div>

            <div className="w-full max-w-md">
                <h1 className="text-center font-handwritten text-5xl mb-8 text-ink rotate-2">
                    Class of '26
                </h1>
                <AuthForm />
                <div className="text-center mt-6 text-sm text-ink/40">
                    Made with memories.
                </div>
            </div>
        </div>
    );
}
