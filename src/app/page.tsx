
'use client';

import { useState, useEffect } from 'react';

interface StockInterface {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
}

interface AnotherInterFace {
  data: Array<StockInterface>;
}

export default function Home() {
  const [marketData, setData] = useState<AnotherInterFace>({data: []});

  useEffect(() => {
    async function fetchMarketData() {
      const response = await fetch(`https://api.marketstack.com/v1/eod?access_key=${process.env.NEXT_PUBLIC_API_KEY}&symbols=AAPL&date_from=2024-01-01`);
      const responseData = await response.json();
      
      setData({data: responseData.data || []});
    }
    fetchMarketData();
  }, [])

  return (
    <div>
      <ul className="space-y-2 p-4">
        {marketData.data.map(d => (
          
            <li key={d.date} className="bg-gray-100 border-l-4 border-blue-500 p-3 rounded-lg shadow-sm">{d.symbol} Open - {d.open} Close - {d.close} High - {d.high} Low - {d.low}</li>
          ))} 
      </ul>
    </div>
  );
}