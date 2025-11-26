import { Topic } from "@/types";
import { TopicCard } from "./TopicCard";

interface TopicListProps {
  topics: Topic[];
  emptyMessage?: string;
}

export function TopicList({ topics, emptyMessage = "Henüz başlık yok" }: TopicListProps) {
  if (topics.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}

