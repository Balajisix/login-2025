import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: {
    eventId: string
  }
}

const eventNames: Record<string, string> = {
  '1': 'Treasure Hunt',
  '2': 'Tech Quiz',
  '3': 'Code Sprint',
}

export default function DashboardPage({ params }: Props) {
  const name = eventNames[params.eventId]

  if (!name) return notFound()

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-[230px] bg-[#1a1a2e] text-white flex flex-col items-center py-10 px-4 space-y-8 shadow-lg">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          Login
        </h1>

        <nav className="w-full space-y-4">
          <Link
            href={`/dashboard/${params.eventId}`}
            className="w-full block text-left px-4 py-3 rounded-lg bg-[#0f0f1c] hover:bg-[#2d2d4a] transition-all"
          >
            🖥️ Dashboard
          </Link>
          <Link
            href="#"
            className="w-full block text-left px-4 py-3 rounded-lg bg-[#0f0f1c] hover:bg-[#2d2d4a] transition-all"
          >
            📝 Edit Details
          </Link>
          <Link
            href="#"
            className="w-full block text-left px-4 py-3 rounded-lg bg-[#0f0f1c] hover:bg-[#2d2d4a] transition-all"
          >
            👥 Team
          </Link>
          <Link
            href={`/dashboard/${params.eventId}/participants`}
            className="w-full block text-left px-4 py-3 rounded-lg bg-[#0f0f1c] hover:bg-[#2d2d4a] transition-all"
          >
            🧑‍🎓 Participants
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6 text-black">Dashboard - {name}</h2>

        <div className="bg-white w-[200px] h-[150px] rounded-xl shadow-md flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-black">50</span>
          <span className="text-sm text-gray-700 font-semibold mt-1">Total Participants</span>
        </div>
      </main>
    </div>
  )
}
