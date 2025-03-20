import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tool } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export const ToolCard = ({ tool, onClick }: ToolCardProps) => {
  return (
    <Card
      className="hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
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
  );
};
