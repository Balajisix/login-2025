import { NextResponse } from 'next/server';

export async function GET() {
  const events = [
    {
      id: '1',
      name: 'Treasure Hunt',
      tagline: 'Find it if you can!',
      image: '/minions.png',
    },
    {
      id: '2',
      name: 'Tech Quiz',
      tagline: 'Crack the code!',
      image: '/minions.png',
    },
    {
      id: '3',
      name: 'Code Sprint',
      tagline: 'Speed meets logic',
      image: '/minions.png',
    },
  ];
  return NextResponse.json(events);
}
