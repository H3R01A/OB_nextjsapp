'use client';
import { getBicoinBlockData, getBitcoinPriceData } from '@/actions/actions';
import '../globals.css';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/utils/context';
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
    color: '#F7931A',
  },
  block: {
    label: 'Bitcoin Block Height',
    color: 'hsl(198.6 88.7% 48.4%)',
  },
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
        <Card className="w-[80%] max-w-3xl">
          <CardHeader>
            <CardTitle>
              Bitcoin Price and Bitcoin Block Height Per Month
            </CardTitle>
            <CardDescription>August 2024 - January 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis yAxisId="left" tickFormatter={(value) => `$${value}`} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar
                  yAxisId="left"
                  dataKey="price"
                  fill="var(--color-price)"
                  radius={4}
                />
                <Bar
                  yAxisId="right"
                  dataKey="block"
                  fill="var(--color-block)"
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
