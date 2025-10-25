import { NextResponse } from 'next/server';
import { generateAbsoluteUrls } from '@/sanity/helpers/generateAbsoluteUrls';
export async function GET(req: Request) {
  const data = await generateAbsoluteUrls(false);
  return NextResponse.json(
    { data: data },
    { status: 200 }
  );
}
