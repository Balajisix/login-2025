import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { eventId: string } }) {
  const mock = [
    {
      id: "1",
      name: "Alice",
      email: "alice@example.com",
      mobileNo: "9998887777",
      gender: "Male",
      college: "PSG Tech",
      program: "B.Tech IT",
      year: "3rd",
      field: "AI/ML",
      idCardUrl: "/sample-id.jpg",
      attended: true
    },
    {
      id: "2",
      name: "Bob",
      email: "bob@example.com",
      mobileNo: "8889656555",
      gender: "Male",
      college: "PSG Tech",
      program: "B.Tech CSE",
      year: "3rd",
      field: "AI/ML",
      idCardUrl: "/sample-id.jpg",
      attended: true
    }
  ];

  return NextResponse.json(mock);
}
