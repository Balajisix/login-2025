'use client';

import { useEffect, useState } from "react";
import ParticipantsTable from "@/components/ParticipantsTable";

interface Participant {
  id: string;
  name: string;
  email: string;
  mobileNo: string;
  gender: string;
  college: string;
  program: string;
  year: string;
  field: string;
  idCardUrl: string;
  attended?: boolean;
}

export default function ParticipantsPage({ params }: { params: { eventId: string } }) {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await fetch(`/api/events/${params.eventId}/participants`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch participants", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [params.eventId]);

  if (loading) return <p className="p-6 text-white">Loading...</p>;

  return (
    <main className="p-4 sm:p-6 md:p-10 bg-[#1a1a2e] min-h-screen text-white">
      <ParticipantsTable data={data} />
    </main>
  );
}
