import { Tool } from '@/types/tool';

export const tools: Tool[] = [
  {
    id: "firebase-login",
    title: "Firebase 登入",
    description: "透過 Firebase 進行使用者驗證",
    icon: "🔑",
    category: "開發工具",
    features: [
      "Google 登入",
      "Email 密碼登入",
      "驗證狀態管理"
    ],
    hidden: false,
  },
  {
    id: "jwt-generator",
    title: "Apple JWS 產生器",
    description: "產生並簽署 JSON Web Signature (JWS)",
    icon: "📝",
    category: "開發工具",
    features: [
      "支援 PEM 檔案匯入",
      "支持 ECDSA 签名",
      "自動生成 JWS"
    ],
    hidden: false,
  },
  {
    id: "alpha-vantage",
    title: "Alpha Vantage API",
    description: "使用 Alpha Vantage API 獲取股票數據",
    icon: "💹",
    category: "投資工具",
    features: [
      "獲取股票價格",
      "獲取期權數據",
      "即時市場資訊"
    ],
    hidden: false,
  },
  {
    id: "tdee-calculator",
    title: "TDEE計算器",
    description: "計算基礎代謝率(BMR)和每日總熱量消耗(TDEE)",
    icon: "🔢",
    category: "健康工具",
    features: [
      "計算BMR基礎代謝率",
      "計算TDEE每日總熱量消耗",
      "根據活動程度調整",
      "支援男性和女性的不同計算公式"
    ],
    hidden: false,
  }
];

export const categories = (): string[] => {
  const uniqueCategories = new Set(tools.map(tool => tool.category));
  return ["全部", ...Array.from(uniqueCategories)];
};
