"use client";
import React, { useState } from 'react';
import { Layout, Search, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { tools,categories } from '@/config/tools';


interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  hidden?: boolean;
}

const useToolsFilter = (
  tools: Tool[], 
  searchTerm: string, 
  selectedCategory: string
): Tool[] => {
  return tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || tool.category === selectedCategory;
    const isVisible = !tool.hidden;
    return matchesSearch && matchesCategory && isVisible;
  });
};

const ToolDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const router = useRouter();

  const filteredTools = useToolsFilter(tools, searchTerm, selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layout className="h-6 w-6" />
            <span className="text-xl font-semibold">工具集合</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
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
            {categories().map((category) => (
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
      </main>
    </div>
  );
};

export default ToolDashboard;
