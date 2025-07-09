import { notFound } from 'next/navigation';

interface Props {
  params: {
    eventId: string;
  };
}

const eventNames: Record<string, string> = {
  '1': 'Treasure Hunt',
  '2': 'Tech Quiz',
  '3': 'Code Sprint',
};

export default function DashboardPage({ params }: Props) {
  const name = eventNames[params.eventId];

  if (!name) return notFound();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#1a1a2e] text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-gradient-to-r from-blue-400 to-purple-500">Login</h1>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 bg-[#0f0f1c] rounded-lg hover:bg-[#2d2d4a] flex items-center gap-2">
            🖥️ Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 bg-[#0f0f1c] rounded-lg hover:bg-[#2d2d4a] flex items-center gap-2">
            📝 Edit Details
          </button>
          <button className="w-full text-left px-4 py-2 bg-[#0f0f1c] rounded-lg hover:bg-[#2d2d4a] flex items-center gap-2">
            👥 Team
          </button>
          <button className="w-full text-left px-4 py-2 bg-[#0f0f1c] rounded-lg hover:bg-[#2d2d4a] flex items-center gap-2">
            🧑‍🎓 Participants
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6 text-black">Dashboard - {name}</h2>

        <div className="bg-white w-[200px] h-[150px] rounded-xl shadow-md flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-black">50</span>
          <span className="text-sm text-gray-700 font-semibold mt-1">Total Participants</span>
        </div>
      </main>
    </div>
  );
}
