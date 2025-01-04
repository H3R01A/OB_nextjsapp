import { createClient } from '@/db/supabase/server';
import { Database } from '@/utils/database.types';

type Token = Database['public']['Tables']['tokens']['Row'];
type DeleteResponse = {
  success: boolean;
  error?: string;
};

export async function addTokenToDB(
  ticker: string,
  name: string,
  user_balance: string,
  total_supply: string
): Promise<string> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from('tokens').upsert(
      {
        ticker,
        name,
        user_balance,
        total_supply,
      },
      { onConflict: 'ticker' } // Ensures that 'ticker' is used to check for conflicts
    );

    if (error) {
      throw new Error(`Error upserting token: ${error.message}`);
    }

    return 'data successfully added';
  } catch (e) {
    const error = e as Error;
    throw Error(`Error with attempting to add token to database ${error}`);
  }
}

export async function findTokenInDB(ticker: string): Promise<boolean> {
  try {
    if (!ticker.trim()) {
      throw new Error('Ticker cannot be empty');
    }

    const supabase = await createClient();

    console.log(ticker);
    const { data, error } = await supabase
      .from('tokens')
      .select('ticker')
      .eq('ticker', ticker)
      .maybeSingle(); /// Use maybeSingle() since we only need to know if it exists

    return data !== null;
  } catch (e) {
    const error = e as Error;
    throw Error(`Error with attempting to find token in database ${error}`);
  }
}

export async function getFavoritesFrmDB(): Promise<Token[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('tokens').select();

    if (error) {
      throw Error(
        'Client error attempting to retrieve favorite tokens from database. Look into error: ',
        error
      );
    }

    return data as Token[];
  } catch (e) {
    const error = e as Error;
    throw Error(
      `General error attempting to retrieve favorite tokens from database. Look into error: ${error}`
    );
  }
}

export async function deleteTokenFrmDB(
  ticker: string
): Promise<DeleteResponse> {
  if (!ticker.trim()) {
    return {
      success: false,
      error: 'Ticker cannot be empty',
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('tokens')
      .delete()
      .eq('ticker', ticker);

    if (error) {
      throw new Error(`Database deletion failed: ${error.message}`);
    }

    return {
      success: true,
    };
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      error: `Failed to delete token: ${error.message}`,
    };
  }
}
