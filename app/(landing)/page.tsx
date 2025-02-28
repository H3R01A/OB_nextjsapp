'use client';
import { getBicoinBlockData, getBitcoinPriceData } from '@/actions/actions';
import '../globals.css';
import { useEffect, useState } from 'react';
import WallectConnect from '@/components/wallet-connect';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const chartConfig = {
  price: {
    label: 'Bitcoin Price',
    color: 'var(--bitcoin)',
  },
  block: {
    label: 'Bitcoin Block Height',
    color: 'var(--block)',
  }
} satisfies ChartConfig;

export default function WelcomePage() {
  const [currentBitcoinPrice, setcurrentBitcoinPrice] = useState('');
  const [currentBitcoinBlock, setcurrentBitcoinBlock] = useState('');
  const chartData = [
    { month: 'August', price: 65357, block: 855012 },
    { month: 'September', price: 57325, block: 859444 },
    { month: 'October', price: 60837, block: 863722 },
    { month: 'November', price: 69482, block: 868479 },
    { month: 'December', price: 97279, block: 872847 },
    {
      month: 'January',
      price: currentBitcoinPrice,
      block: currentBitcoinBlock,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceData = await getBitcoinPriceData();
        setcurrentBitcoinPrice(priceData.market_data.current_price.usd);
        setcurrentBitcoinBlock(await getBicoinBlockData());
      } catch (error) {
        console.log('Error occured fetching data: ', error);
      }
    };

    void fetchData();
  }, []);

  return (
    <main>
      <div className="mt-10 flex flex-col items-center text-2xl text-white">
        <h1 className="py-5 text-5xl font-bold">
          Welcome to {''}
          <span className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text font-bold text-transparent">
            OB NEXT
          </span>
        </h1>
        <h1 className="mb-16 text-2xl">Let&apos;s Get Started!</h1>
        <div className="mb-16">
          <WallectConnect />
        </div>
        <div className="mt-6 text-xl">
          Current Bitcoin price:{' '}
          {!currentBitcoinPrice
            ? 'Fetching data...'
            : `$${currentBitcoinPrice}`}
        </div>
        <div className="mb-16 text-xl">
          Current Bitcoin Block:{' '}
          {!currentBitcoinBlock ? 'Fetching data...' : `${currentBitcoinBlock}`}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Card className="w-[80%] max-w-3xl bg-transparent border-none text-white">
          <CardHeader>
            <CardTitle className='text-white'>
              Bitcoin Price and Bitcoin Block Height Per Month
            </CardTitle>
            <CardDescription>August 2024 - January 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.1)"/>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => value.slice(0, 3)}
                  stroke="#ffffff"
                  tick={{ fill: '#ffffff' }}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) => `$${value}`}
                  stroke="#ffffff"
                  tick={{ fill: '#ffffff' }} // Add white color to left Y-axis text
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => value}
                  stroke="#ffffff"
                  tick={{ fill: '#ffffff' }} // Add white color to left Y-axis text
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar
                  yAxisId="left"
                  dataKey="price"
                  fill="var(--bitcoin)"
                  radius={4}
                />
                <Bar
                  yAxisId="right"
                  dataKey="block"
                  fill="var(--block)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Price and Height are trending up{' '}
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
