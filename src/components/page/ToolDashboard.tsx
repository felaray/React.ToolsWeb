"use client";
import React, { useState } from 'react';
import ToolCard from './ToolCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToolDetail } from './ToolDetail';
import { Tool } from './types';

const ToolDashboard = () => {
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

  const tools: Tool[] = [
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
      component: <div className="text-center">JSON 格式化工具介面</div>,
      hidden: true,
    },
    // 其他工具...
  ];

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTool = tools.find(tool => `/tool/${tool.id}` === window.location.pathname);

  const renderContent = () => {
    if (currentTool) {
      return <ToolDetail tool={currentTool} />;
    }
    return (
      <>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onClick={() => { window.location.href = `/tool/${tool.id}`; }} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onHomeClick={() => window.location.href = '/'} />
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default ToolDashboard;
