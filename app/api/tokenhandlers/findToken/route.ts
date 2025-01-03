import { NextRequest, NextResponse } from 'next/server';

import { findTokenInDB } from '@/db/supabase/utils/database-helpers';

export async function POST(req: NextRequest) {
  try {
    const { ticker } = await req.json();

    const response = await findTokenInDB(ticker);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
