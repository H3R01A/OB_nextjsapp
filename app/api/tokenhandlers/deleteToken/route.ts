import { NextRequest, NextResponse } from 'next/server';
import { TokenRequest } from '@/utils/types';
import { deleteTokenFrmDB } from '@/db/supabase/utils/database-helpers';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the incoming request body
    const body = (await req.json()) as Partial<TokenRequest>;

    // Validate that all required fields are present and correctly typed
    const { ticker } = body;

    if (typeof ticker !== 'string') {
      throw new Error('Invalid request payload');
    }


    const data = await deleteTokenFrmDB(ticker);

    console.log(`this is the response from delete from token`);
    console.log(data)

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
