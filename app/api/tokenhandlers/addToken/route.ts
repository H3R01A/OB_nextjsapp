import { NextRequest, NextResponse } from 'next/server';
import { addTokenToDB } from '@/db/supabase/utils/database-helpers';
import { AddTokenRequest } from '@/utils/types';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the incoming request body
    const body = (await req.json()) as Partial<AddTokenRequest>;

    // Validate that all required fields are present and correctly typed
    const { ticker, name, user_balance, total_supply } = body;

    if (
      typeof ticker !== 'string' ||
      typeof name !== 'string' ||
      typeof user_balance !== 'string' ||
      typeof total_supply !== 'string'
    ) {
      throw new Error('Invalid request payload');
    } 

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
