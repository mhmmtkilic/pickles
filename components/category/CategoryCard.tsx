import Link from "next/link";
import { TopicCategory } from "@/types";
import { CATEGORIES } from "@/constants";
import { Card, CardContent } from "@/components/ui";

interface CategoryCardProps {
  category: TopicCategory;
  topicCount?: number;
}

export function CategoryCard({ category, topicCount = 0 }: CategoryCardProps) {
  const info = CATEGORIES[category];

  return (
    <Link href={`/category/${category}`}>
      <Card className="transition-all hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700">
        <CardContent className="pt-4">
          <div className="text-3xl">{info.icon}</div>
          <h3 className="mt-2 font-semibold text-zinc-900 dark:text-white">
            {info.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {info.description}
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            {topicCount} başlık
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

