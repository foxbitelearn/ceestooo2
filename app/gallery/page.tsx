
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
    const galleryDir = path.join(process.cwd(), 'public', 'Galleryimg');
    let images: { src: string; caption: string }[] = [];

    // Safety check: Create directory if it doesn't exist
    if (!fs.existsSync(galleryDir)) {
        try {
            fs.mkdirSync(galleryDir, { recursive: true });
        } catch (e) {
            console.error("Failed to create gallery directory", e);
        }
    }

    try {
        const files = fs.readdirSync(galleryDir);
        images = files
            .filter(file => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file))
            .map(file => ({
                src: `/Galleryimg/${file}`,
                // Remove extension and decode URI components for proper text
                caption: decodeURIComponent(path.parse(file).name)
            }));
    } catch (error) {
        console.error("Error reading gallery images:", error);
    }

    return (
        <div className="min-h-screen bg-paper bg-repeat">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <Link href="/" className="text-ink/60 hover:text-ink transition-colors flex items-center gap-2 group">
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>
                    <h1 className="font-handwritten text-4xl text-ink font-bold">Class Memories</h1>
                    <div className="w-10"></div> {/* Spacer for center alignment */}
                </div>

                {/* Feed */}
                <div className="space-y-12 pb-16">
                    {images.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 rounded-xl border-dashed border-2 border-ink/20">
                            <div className="text-6xl mb-4 text-ink/20">🖼️</div>
                            <h2 className="font-serif text-xl text-ink/60 italic mb-2">The gallery is waiting...</h2>
                            <p className="text-ink/40 text-sm">Add images to <code className="bg-ink/5 px-2 py-1 rounded">public/Galleryimg</code></p>
                        </div>
                    ) : (
                        images.map((image, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-ink/5">
                                {/* Image Container */}
                                <div className="relative w-full">
                                    <Image
                                        src={image.src}
                                        alt={image.caption}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>

                                {/* Caption Area */}
                                <div className="p-4 md:p-6 bg-white">
                                    <p className="font-serif text-lg md:text-xl text-ink leading-relaxed">
                                        <span className="font-bold mr-2">{image.caption}</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Message */}
                <div className="text-center text-ink/40 text-sm font-serif italic mb-8">
                    ~ End of Feed ~
                </div>
            </div>
        </div>
    );
}
