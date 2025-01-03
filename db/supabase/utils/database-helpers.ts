import { createClient } from '@/db/supabase/server';

export async function addTokenToDB(
  ticker: string,
  name: string,
  user_balance: string,
  total_supply: string
) {
  const supabase = await createClient();

  const { data: found, error: foundError } = await supabase
    .from('tokens')
    .select()
    .eq('ticker', ticker);

  console.log({found})
  if(found){
    return 'data already added'
  }

  const { error } = await supabase
    .from('tokens')
    .insert({ ticker, name, user_balance, total_supply });

  if (error) {
    throw Error(
      'error attempting to add tokens to database. Look into error: ',
      error
    );
  }

  return 'data successfully added';
}

export async function findTokenInDB(ticker: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('tokens')
    .select()
    .eq('ticker', ticker);


  if (data?.length === 0 || data === null || error) {
    return false;
  }
  return true;
}

export async function getFavoritesFrmDB() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tokens').select();

  if (error) {
    throw Error(
      'error attempting to retrive favorite tokens from database. Look into error: ',
      error
    );
  }

  return data;
}

export async function updateTokenInDB(ticker: string, update: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tokens')
    .update({ ticker })
    .eq(`${update}`, update);

  if (error) {
    throw Error(
      'error attempting to update database. Look into error: ',
      error
    );
  }

  return data;
}

export async function deleteTokenFrmDB(ticker: string) {
  const supabase = await createClient();
  const response = await supabase.from('tokens').delete().eq('ticker', ticker);

  return response;
}
