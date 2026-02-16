
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFullDatabase, verifyUser } from '@/lib/storage';
import Link from 'next/link';
import { STUDENTS } from '@/lib/students';
import { DownloadButton } from '@/components/DownloadButton';

// Force dynamic since we read cookies and local files
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const cookieStore = await cookies();
    const sessionUser = cookieStore.get('session_user')?.value;

    // Strict Security Check: ONLY "DHRUPAD"
    if (sessionUser !== "DHRUPAD") {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-red-500 font-mono p-4 text-center">
                <h1 className="text-6xl font-bold mb-4">403</h1>
                <p className="text-xl">ACCESS DENIED.</p>
                <p className="text-sm opacity-50 mt-2">This incident will be reported.</p>
                <Link href="/" className="mt-8 text-white hover:underline">Return Home</Link>
            </div>
        );
    }

    const db = await getFullDatabase();

    // Helper to format timestamp
    const fmt = (ts: number) => new Date(ts).toLocaleString();

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-500">Welcome, Creator.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Home</Link>
                    <DownloadButton data={db} filename={`ceestoo-backup-${Date.now()}.json`} />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                {/* Stats */}
                <div className="bg-white p-6 rounded-lg shadow col-span-4">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Statistics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded">
                            <div className="text-2xl font-bold text-blue-600">{db.users.length}</div>
                            <div className="text-sm text-gray-600">Total Users</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded">
                            <div className="text-2xl font-bold text-green-600">{db.messages.length}</div>
                            <div className="text-sm text-gray-600">Messages Sent</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded">
                            <div className="text-2xl font-bold text-purple-600">{db.reviews.length}</div>
                            <div className="text-sm text-gray-600">Teacher Reviews</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded">
                            <div className="text-2xl font-bold text-orange-600">{STUDENTS.length}</div>
                            <div className="text-sm text-gray-600">Total Students</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">Message Tracking Log</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">Time</th>
                                <th className="p-4 border-b">Intended Recipient (To)</th>
                                <th className="p-4 border-b">Message Content</th>
                                <th className="p-4 border-b text-red-600 bg-red-50">Likely Sent By</th>
                                <th className="p-4 border-b text-xs text-gray-400">Tracking ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {db.messages.sort((a, b) => b.timestamp - a.timestamp).map((msg) => (
                                <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                                        {fmt(msg.timestamp)}
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">
                                        {msg.to}
                                    </td>
                                    <td className="p-4 text-gray-700 max-w-xs truncate" title={msg.content}>
                                        {msg.content}
                                    </td>
                                    <td className={`p-4 font-bold ${msg.likelySentBy.includes('Unknown') ? 'text-gray-400 italic' : 'text-red-600'}`}>
                                        {msg.likelySentBy}
                                    </td>
                                    <td className="p-4 text-xs font-mono text-gray-400 truncate max-w-[100px]" title={msg.trackingId}>
                                        {msg.trackingId || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {db.messages.length === 0 && (
                    <div className="p-10 text-center text-gray-500 italic">No messages found in the database.</div>
                )}
            </div>
        </div>
    );
}
