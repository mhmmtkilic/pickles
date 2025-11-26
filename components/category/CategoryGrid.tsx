import { TopicCategory } from "@/types";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: { category: TopicCategory; count: number }[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map(({ category, count }) => (
        <CategoryCard key={category} category={category} topicCount={count} />
      ))}
    </div>
  );
}

