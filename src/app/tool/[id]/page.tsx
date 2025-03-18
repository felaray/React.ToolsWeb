"use client";
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import FirebaseLogin from '@/components/tools/firebase-login';
import AppleJWSGenerator from '@/components/tools/apple-jwt-maker';
import AlphaVantage from '@/components/tools/alpha-vantage';

const tools = {
  'firebase-login': {
    component: FirebaseLogin,
    title: 'Firebase 登入',
    description: '透過 Firebase 進行使用者驗證',
    icon: '🔑',
  },
  'jwt-generator': {
    component: AppleJWSGenerator,
    title: 'Apple JWS 產生器',
    description: '產生並簽署 JSON Web Signature (JWS)',
    icon: '📝',
  },
  'alpha-vantage': {
    component: AlphaVantage,
    title: 'Alpha Vantage API',
    description: '使用 Alpha Vantage API 獲取股票數據',
    icon: '💹',
  },
};

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.id as string;
  const tool = tools[toolId as keyof typeof tools];

  if (!tool) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">找不到此工具</h1>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  const ToolComponent = tool.component;

  return (
    <div className="container mx-auto px-6 py-8">
      <button
        onClick={() => router.push('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>返回工具列表</span>
      </button>

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-4xl">{tool.icon}</span>
          <h1 className="text-2xl font-bold">{tool.title}</h1>
        </div>
        <p className="text-gray-600">{tool.description}</p>
      </div>

      <ToolComponent />
    </div>
  );
}
