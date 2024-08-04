'use server';
import 'server-only';
import xss from 'xss';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function getBicoinBlockData() {
  const response = await fetch(`https://blockchain.info/q/getblockcount`, {
    next: { revalidate: 600 },
  });
  revalidatePath('/');
  return response.json();
}

export async function getBitcoinPriceData() {
  const headers: HeadersInit = {
    'x-cg-demo-api-key': process.env.COINGECKO_API_KEY ?? '',
  };

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin`,
    {
      headers,
      next: { revalidate: 60 },
    }
  );

  revalidatePath('/');
  return response.json();
}

export async function handleTickerSubmission(formData: FormData) {
  let tickerInput = formData.get('ticker');
  const userWallet = formData.get('address');

  if (typeof tickerInput !== 'string') {
    throw new Error('Invalid ticker input');
  }

  const sanitizedTickerInput = xss(tickerInput);

  if (typeof userWallet !== 'string') {
    throw new Error('Invalid user wallet input');
  }

  const sanitizeduserWallet = xss(userWallet);

  redirect(`/token/${sanitizedTickerInput}?address=${sanitizeduserWallet}`);
}

export async function handleOrderSubmission(formData: FormData) {
  const userOrder = formData.get('order');
  redirect(`/order/${userOrder}`);
}

export async function getTickerData(ticker: String) {
  const headers: HeadersInit = {
    'x-api-key': process.env.OB_API_KEY ?? '',
  };

  const response = await fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/ticker_info?ticker=${ticker}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}

export async function getTickerBalance(address: String, ticker: String) {
  const headers: HeadersInit = {
    'x-api-key': process.env.OB_API_KEY ?? '',
  };
  const response = await fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet?address=bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06&ticker=${ticker}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}

export async function getOrderData(id: String) {
  const response = await fetch(`https://api.ordinalsbot.com/order?id=${id}`);

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}
