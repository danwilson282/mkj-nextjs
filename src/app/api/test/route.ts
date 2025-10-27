import { NextResponse } from 'next/server';
import {
  generateAbsoluteUrls,
  buildPageTree,
} from '@/sanity/helpers/generateAbsoluteUrls';
export async function GET(req: Request) {
  const data = await generateAbsoluteUrls(false);
  const tree = data ? buildPageTree(data, true) : [];
  return NextResponse.json({ data: tree }, { status: 200 });
}
