import { NextRequest, NextResponse } from 'next/server';

import { addTokenToDB } from '@/db/supabase/utils/database-helpers';

export async function POST(req: NextRequest) {
  try {
    const { ticker, name, user_balance, total_supply } = await req.json();

    const response = await addTokenToDB(
      ticker,
      name,
      user_balance,
      total_supply
    );

    console.log(`data from adding ticker to db ${response}`);
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
