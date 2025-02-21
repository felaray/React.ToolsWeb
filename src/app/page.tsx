"use client";
import React, { useState } from 'react';
import { Layout, Search, ArrowLeft, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 模擬 React Router 的行為
const useRouter = () => {
  const [path, setPath] = useState('/');
  return {
    push: (newPath: string) => setPath(newPath),
    pathname: path,
    back: () => setPath('/'),
  };
};

// 工具詳細頁面組件
interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  features?: string[];
  component: React.ReactNode;
}

const ToolDetail = ({ tool, onBack }: { tool: Tool | null, onBack: () => void }) => {
  if (!tool) return null;

  return (
    <div className="container mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>返回工具列表</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-4xl">{tool.icon}</span>
          <h1 className="text-2xl font-bold">{tool.title}</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">工具說明</h2>
            <p className="text-gray-600">{tool.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">功能特點</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {tool.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">使用方式</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              {tool.component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolDashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const categories = [
    "全部",
    "資料處理",
    "安全工具",
    "多媒體",
    "開發工具",
    "實用工具"
  ];

  const tools = [
    {
      id: "json-formatter",
      title: "JSON 格式化",
      description: "JSON 資料的格式化與驗證工具",
      icon: "🔄",
      category: "資料處理",
      features: [
        "自動格式化 JSON 字串",
        "語法錯誤檢查",
        "支援縮排調整",
        "支援複製格式化後的程式碼"
      ],
      component: <div className="text-center">JSON 格式化工具介面</div>
    },
    {
      id: "base64",
      title: "Base64 轉換",
      description: "文字與 Base64 編碼轉換",
      icon: "🔐",
      category: "安全工具",
      features: [
        "文字轉 Base64",
        "Base64 轉文字",
        "支援檔案轉換",
        "支援批次處理"
      ],
      component: <div className="text-center">Base64 轉換工具介面</div>
    },
    // ... 其他工具
  ];

  // 獲取當前顯示的工具
  const currentTool = tools.find(tool => `/tool/${tool.id}` === router.pathname);

  // 搜索和分類過濾
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 渲染主頁面或工具詳細頁面
  const renderContent = () => {
    if (currentTool) {
      return (
        <ToolDetail
          tool={currentTool}
          onBack={() => router.back()}
        />
      );
    }

    return (
      <>
        {/* 搜索和過濾區 */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="搜尋工具..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 工具網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card 
              key={tool.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
              onClick={() => router.push(`/tool/${tool.id}`)}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">{tool.icon}</span>
                  <span>{tool.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{tool.description}</p>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {tool.category}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              找不到符合 &quot;{searchTerm}&quot; 的工具
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航欄 */}
      <nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layout className="h-6 w-6" />
            <span 
              className="text-xl font-semibold cursor-pointer"
              onClick={() => router.push('/')}
            >
              工具集合
            </span>
          </div>
        </div>
      </nav>

      {/* 主要內容區 */}
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>

      {/* 頁尾 */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-gray-600">
          © 2025 工具集合網站
        </div>
      </footer>
    </div>
  );
};

export default ToolDashboard;