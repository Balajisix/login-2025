'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

type Participant = {
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
};

interface Props {
  data: Participant[];
}

export default function ParticipantsTable({ data }: Props) {
  const [selected, setSelected] = useState<Participant | null>(null);
  const [attendanceMode, setAttendanceMode] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = data.filter((p) => {
    const s = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(s) ||
      p.email.toLowerCase().includes(s) ||
      p.mobileNo.includes(s)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <h2 className="text-3xl font-bold text-white">Participants</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <Input
            type="text"
            placeholder="Search by name, email, or mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[250px] text-black"
          />
          <div className="flex items-center gap-2 text-sm text-white">
            <label htmlFor="attendance">Enable Attendance</label>
            <Switch id="attendance" checked={attendanceMode} onCheckedChange={setAttendanceMode} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#1e1e2f] p-4 rounded-xl shadow-lg border border-white/10">
        <Table className="min-w-[700px] text-white">
          <TableHeader>
            <TableRow className="bg-[#2a2a40]">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Mobile No</TableHead>
              <TableHead className="text-white">Gender</TableHead>
              {attendanceMode && <TableHead className="text-white">Attendance</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <Dialog key={p.id}>
                  <DialogTrigger asChild>
                    <TableRow
                      onClick={() => setSelected(p)}
                      className="cursor-pointer hover:bg-white/5 transition"
                    >
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.email}</TableCell>
                      <TableCell>{p.mobileNo}</TableCell>
                      <TableCell>{p.gender}</TableCell>
                      {attendanceMode && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={p.attended}
                            readOnly
                            className="accent-green-400"
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  </DialogTrigger>

                  {selected?.id === p.id && (
                    <DialogContent className="max-w-md bg-white text-black">
                      <DialogHeader>
                        <DialogTitle className="text-xl">{selected.name}'s Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <p><strong>College:</strong> {selected.college}</p>
                        <p><strong>Program:</strong> {selected.program}</p>
                        <p><strong>Year:</strong> {selected.year}</p>
                        <p><strong>Field:</strong> {selected.field}</p>
                        <div className="pt-2">
                          <p className="font-semibold mb-1">ID Card:</p>
                          <img
                            src={selected.idCardUrl}
                            alt="ID Card"
                            className="w-full rounded-md border"
                          />
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={attendanceMode ? 5 : 4} className="text-center py-8 text-gray-400">
                  No participants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
