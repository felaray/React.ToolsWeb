import { Tool } from '@/types/tool';

export const tools: Tool[] = [
  {
    id: "firebase-login",
    title: "Firebase 登入",
    description: "透過 Firebase 進行使用者驗證",
    icon: "🔑",
    category: "安全工具",
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
    category: "安全工具",
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
    category: "開發工具",
    features: [
      "獲取股票價格",
      "獲取期權數據",
      "即時市場資訊"
    ],
    hidden: false,
  }
  // ...existing tools...
];
