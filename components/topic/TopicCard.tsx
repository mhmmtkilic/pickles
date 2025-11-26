import Link from "next/link";
import { Topic } from "@/types";
import { CATEGORIES } from "@/constants";
import { Card, CardContent, Badge } from "@/components/ui";

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  const category = CATEGORIES[topic.category];

  return (
    <Link href={`/topic/${topic.slug}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span>{category.icon}</span>
                <Badge variant="default" size="sm">{category.name}</Badge>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {topic.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                {topic.wikiContent.content.slice(0, 150)}...
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
            <span>👁️ {topic.viewCount}</span>
            <span>👥 {topic.contributorCount} katkıda bulunan</span>
            <span>💬 {topic.entries.length} yorum</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

