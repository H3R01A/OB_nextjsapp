'use server';

import { redirect } from 'next/navigation';

export async function handleTickerSubmission(formData: FormData) {
  const tickerInput = formData.get('ticker');
  const userWallet = formData.get('address');
  redirect(`/token/${tickerInput}?address=${userWallet}`);
}

export async function handleOrderSubmission(formData: FormData) {
  const userOrder = formData.get('order');
  redirect(`/order/${userOrder}`);
}

export async function getTickerData(ticker: String) {
  const headers: HeadersInit = {
    'x-api-key': process.env.API_KEY ?? '',
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
    'x-api-key': process.env.API_KEY ?? '',
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
