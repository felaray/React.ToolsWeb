import { Tool } from './types';

interface ToolDetailProps {
    tool: Tool;
  }
  
  export const ToolDetail = ({ tool }: ToolDetailProps) => {
    if (!tool) return null;
  
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold">{tool.title}</h1>
          <p className="text-gray-600">{tool.description}</p>
          {/* 更多的詳細資料 */}
        </div>
      </div>
    );
  };
  