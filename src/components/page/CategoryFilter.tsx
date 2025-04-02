const CategoryFilter = ({ categories, selectedCategory, onSelect }: { categories: string[], selectedCategory: string, onSelect: (category: string) => void }) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelect(category)}
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
);

export default CategoryFilter;
