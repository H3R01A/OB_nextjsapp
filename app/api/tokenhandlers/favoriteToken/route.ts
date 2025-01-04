import { NextRequest, NextResponse } from 'next/server';

import { getFavoritesFrmDB } from '@/db/supabase/utils/database-helpers';

export async function GET(req: NextRequest) {
  try {
    const response = await getFavoritesFrmDB();
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
