

interface MessageCardProps {
    content: string;
    timestamp: number;
    className?: string;
    variant?: 'yellow' | 'blue' | 'pink' | 'green';
}

const variants = {
    yellow: "bg-[#fef9c3] border-[#fde047]",
    blue: "bg-[#dbeafe] border-[#93c5fd]",
    pink: "bg-[#fce7f3] border-[#f9a8d4]",
    green: "bg-[#dcfce7] border-[#86efac]",
};

export function MessageCard({ content, timestamp, className = "", variant = 'yellow' }: MessageCardProps) {
    // Random rotation for natural look (in real app, use index or seeded random to avoid hydration mismatch)
    // For now, we'll just apply a fixed slightly random rotation via style or just use CSS classes

    return (
        <div
            className={`relative p-6 rounded-sm shadow-md border-t-8 ${variants[variant]} ${className} transform transition hover:-translate-y-1 hover:shadow-lg`}
            style={{
                boxShadow: "2px 4px 6px rgba(0,0,0,0.1)",
            }}
        >
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 rotate-[1deg] backdrop-blur-[1px] shadow-sm transform skew-x-12"></div>

            <div className="font-handwritten text-2xl leading-relaxed text-ink/90 whitespace-pre-wrap">
                {content}
            </div>

            <div className="mt-4 text-xs font-sans text-ink/40 text-right flex items-center justify-end gap-1">
                <span>{new Date(timestamp).toLocaleDateString()}</span>
                <span>•</span>
                <span>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
    );
}
