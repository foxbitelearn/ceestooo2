
interface PolaroidProps {
    src: string;
    caption?: string;
    className?: string;
    rotate?: number;
}

export function Polaroid({ src, caption, className = "", rotate = 0 }: PolaroidProps) {
    // Use inline style for rotation to allow dynamic randomness
    return (
        <div
            className={`bg-white p-3 shadow-lg transition-transform hover:scale-105 hover:z-10 ${className}`}
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <div className="aspect-square bg-gray-100 overflow-hidden mb-3 border border-gray-100">
                <img
                    src={src}
                    alt={caption || "Gallery image"}
                    className="w-full h-full object-cover filter sepia-[0.2] hover:sepia-0 transition-all duration-500"
                />
            </div>
            {caption && (
                <div className="text-center font-handwritten text-xl text-ink/80 pb-2 leading-tight">
                    {caption}
                </div>
            )}
        </div>
    );
}
