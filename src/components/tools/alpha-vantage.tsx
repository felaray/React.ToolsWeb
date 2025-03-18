import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OptionsDataTable = () => {
  const [symbol, setSymbol] = useState('');
  const [date, setDate] = useState('');
  const [expirationDates, setExpirationDates] = useState<string[]>([]);
  
  interface OptionData {
    contractSymbol: string;
    lastTradeDate: number;
    strike: number;
    lastPrice: number;
    bid: number;
    ask: number;
    change: number;
    percentChange: number;
    volume: number;
    openInterest: number;
    impliedVolatility: number;
    inTheMoney: boolean;
    contractSize: string;
    currency: string;
  }

  interface ExpirationResponse {
    expirations: string[];
    symbol: string;
  }

  const [data, setData] = useState<OptionData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchExpirationDates = async (symbolValue: string) => {
    if (!symbolValue) return;
    
    try {
      const response = await fetch(
        `https://pystock.azurewebsites.net/options/expirations?symbol=${symbolValue}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ExpirationResponse = await response.json();
      if (result.expirations && Array.isArray(result.expirations)) {
        setExpirationDates(result.expirations);
        // setDate(''); // 清空現有選擇
        // 沒選擇就是為第一筆日期
        if (!date) {
          setDate(result.expirations[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching expiration dates:', error);
      setError('獲取到期日時發生錯誤');
    }
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSymbol = e.target.value;
    setSymbol(newSymbol);
  };

  const updateExpirationDates = () => {
    fetchExpirationDates(symbol);
  };

  const fetchData = async () => {
    if (!symbol || !date) {
      setError('請輸入股票代碼和到期日');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://pystock.azurewebsites.net/options/data?symbol=${symbol}&expiration=${date}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        setData(result);
      } else {
        setError('無法獲取數據');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('獲取數據時發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>期權數據查詢</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="輸入股票代碼 (例如: SMCI)"
            value={symbol}
            onChange={handleSymbolChange}
            className="max-w-xs"
          />
          <Button 
            onClick={updateExpirationDates}
            variant="outline"
          >
            更新到期日
          </Button>
          <Select
            value={date}
            onValueChange={setDate}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="選擇到期日" />
            </SelectTrigger>
            <SelectContent>
              {expirationDates.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? '載入中...' : '查詢'}
          </Button>
        </div>

        {error && (
          <Alert className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-right">履約價</th>
                <th className="p-2 border text-right">最新價格</th>
                <th className="p-2 border text-right">買入價</th>
                <th className="p-2 border text-right">賣出價</th>
                <th className="p-2 border text-right">漲跌</th>
                <th className="p-2 border text-right">漲跌幅</th>
                <th className="p-2 border text-right">成交量</th>
                <th className="p-2 border text-right">未平倉量</th>
                <th className="p-2 border text-right">隱含波動率</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr 
                  key={item.contractSymbol} 
                  className={`hover:bg-gray-50 ${item.inTheMoney ? 'bg-blue-50' : ''}`}
                >
                  <td className="p-2 border text-right">{item.strike}</td>
                  <td className="p-2 border text-right">{item.lastPrice}</td>
                  <td className="p-2 border text-right">{item.bid}</td>
                  <td className="p-2 border text-right">{item.ask}</td>
                  <td className="p-2 border text-right">{item.change}</td>
                  <td className="p-2 border text-right">{item.percentChange}%</td>
                  <td className="p-2 border text-right">{isNaN(item.volume) ? '-' : item.volume}</td>
                  <td className="p-2 border text-right">{item.openInterest}</td>
                  <td className="p-2 border text-right">{(item.impliedVolatility * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionsDataTable;