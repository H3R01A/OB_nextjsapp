import { NextRequest, NextResponse } from 'next/server';

import { deleteTokenFrmDB } from '@/db/supabase/utils/database-helpers';

export async function POST(req: NextRequest) {
  try {
    const { ticker } = await req.json();

    const data = await deleteTokenFrmDB(ticker);

    console.log(`this is the response from delete from token ${data}`)

    return NextResponse.json({ status: 200 });
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
