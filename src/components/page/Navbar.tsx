import { Layout } from 'lucide-react';

const Navbar = ({ onHomeClick }: { onHomeClick: () => void }) => (
  <nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Layout className="h-6 w-6" />
        <span 
          className="text-xl font-semibold cursor-pointer"
          onClick={onHomeClick}
        >
          工具集合
        </span>
      </div>
    </div>
  </nav>
);

export default Navbar;
