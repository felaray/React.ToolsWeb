import { Tool } from '@/types/tool';

export const useToolsFilter = (
  tools: Tool[], 
  searchTerm: string, 
  selectedCategory: string
) => {
  return tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || tool.category === selectedCategory;
    const isVisible = !tool.hidden;
    return matchesSearch && matchesCategory && isVisible;
  });
};
