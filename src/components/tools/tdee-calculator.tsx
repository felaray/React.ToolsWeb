"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TDEEFormData {
  gender: string;
  birthDate: string;
  weight: number; // kg
  height: number; // cm
  activityLevel: string;
}

const activityLevels = {
  sedentary: { value: 1.2, label: "久坐不動 (幾乎不運動)" },
  light: { value: 1.375, label: "輕度活動 (每週運動1-3次)" },
  moderate: { value: 1.55, label: "中度活動 (每週運動3-5次)" },
  active: { value: 1.725, label: "高度活動 (每週運動6-7次)" },
  extreme: { value: 1.9, label: "極度活動 (密集運動或體力勞動)" }
};

const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const defaultValues: TDEEFormData = {
  gender: "male",
  birthDate: "1990-01-01",
  weight: 60,
  height: 165,
  activityLevel: "sedentary"
};

export default function TDEECalculator() {
  const [formData, setFormData] = useState<TDEEFormData>({
    gender: "male",
    birthDate: "",
    weight: 0,
    height: 0,
    activityLevel: "sedentary"
  });
  const [results, setResults] = useState<{bmr: number; tdee: number} | null>(null);

  const calculateBMR = () => {
    let bmr = 0;
    const age = calculateAge(formData.birthDate);
    
    if (formData.gender === "male") {
      // 男性 BMR = (10 × 體重) + (6.25 × 身高) - (5 × 年齡) + 5
      bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * age) + 5;
    } else {
      // 女性 BMR = (10 × 體重) + (6.25 × 身高) - (5 × 年齡) - 161
      bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * age) - 161;
    }
    
    const tdee = bmr * activityLevels[formData.activityLevel as keyof typeof activityLevels].value;
    
    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateBMR();
  };

  const handleInputChange = (field: keyof TDEEFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'gender' || field === 'activityLevel' ? value : value
    }));
  };

  const loadDefaultValues = () => {
    setFormData(defaultValues);
    setResults(null);
  };

  const clearForm = () => {
    setFormData({
      gender: "male",
      birthDate: "",
      weight: 0,
      height: 0,
      activityLevel: "sedentary"
    });
    setResults(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>TDEE / BMR 計算器</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">性別</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇性別" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男性</SelectItem>
                  <SelectItem value="female">女性</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">出生日期</label>
              <Input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">體重 (公斤)</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={formData.weight || ''}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="請輸入體重"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">身高 (公分)</label>
              <Input
                type="number"
                min="0"
                value={formData.height || ''}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="請輸入身高"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium">活動程度</label>
              <Select
                value={formData.activityLevel}
                onValueChange={(value) => handleInputChange('activityLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇活動程度" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityLevels).map(([key, {label}]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">計算</Button>
            <Button type="button" variant="outline" onClick={loadDefaultValues} className="flex-1">
              載入預設值
            </Button>
            <Button type="button" variant="outline" onClick={clearForm} className="flex-1">
              清空
            </Button>
          </div>

          {results && (
            <div className="mt-6 space-y-4">
              <Alert>
                <AlertDescription className="space-y-2">
                  <p className="font-semibold">基礎代謝率 (BMR):</p>
                  <p className="text-2xl">{results.bmr} 大卡/天</p>
                  <p className="text-sm text-gray-500">這是您的身體在休息狀態下消耗的熱量</p>
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertDescription className="space-y-2">
                  <p className="font-semibold">總熱量消耗 (TDEE):</p>
                  <p className="text-2xl">{results.tdee} 大卡/天</p>
                  <p className="text-sm text-gray-500">這是您每天總共消耗的熱量</p>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
