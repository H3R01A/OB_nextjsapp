'use server';
import 'server-only';
import xss from 'xss';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { WalletBalance, TickerInfo } from '../utils/types';


export async function getBicoinBlockData() {
  const response = await fetch(`https://blockchain.info/q/getblockcount`, {
    next: { revalidate: 600 },
  });
  revalidatePath('/');
  return response.json();
}

export async function getBitcoinPriceData() {
  // Can be configured to use choice of API for data fetching current bitcoin price.
  // IMPORTANT! Make sure to change the header key name to match the required key name for API
  const headers: HeadersInit = {
    'x-cg-demo-api-key': process.env.BITCOIN_PRICE ?? '',
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

export async function handleTickerSubmission(
  formData: FormData
): Promise<void> {
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

export async function handleOrderSubmission(formData: FormData): Promise<void> {
  const userOrder = formData.get('order');
  redirect(`/order/${userOrder}`);
}

export async function getTickerData(ticker: string): Promise<TickerInfo> {
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

export async function getTickerBalance(
  address: string,
  ticker: string
): Promise<WalletBalance> {
  const headers: HeadersInit = {
    'x-api-key': process.env.OB_API_KEY ?? '',
  };
  const response = await fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet?address=${address}&ticker=${ticker}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}

export async function getOrderData(id: string) {
  const response = await fetch(`https://api.ordinalsbot.com/order?id=${id}`);

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}