import { Entry } from "@/types";
import { EntryCard } from "./EntryCard";

interface EntryListProps {
  entries: Entry[];
  onLike?: (entryId: string) => void;
  onDislike?: (entryId: string) => void;
}

export function EntryList({ entries, onLike, onDislike }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="py-8 text-center text-zinc-500">
        Henüz yorum yok. İlk yorumu sen yap!
      </div>
    );
  }

  return (
    <div>
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onLike={() => onLike?.(entry.id)}
          onDislike={() => onDislike?.(entry.id)}
        />
      ))}
    </div>
  );
}

