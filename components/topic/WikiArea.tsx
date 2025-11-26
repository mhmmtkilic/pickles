"use client";

import { useState } from "react";
import { WikiContent } from "@/types";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface WikiAreaProps {
  wiki: WikiContent;
  canEdit?: boolean;
  onEdit?: (content: string) => void;
}

export function WikiArea({ wiki, canEdit = false, onEdit }: WikiAreaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(wiki.content);

  const handleSave = () => {
    onEdit?.(editContent);
    setIsEditing(false);
  };

  return (
    <Card className="border-2 border-amber-200 dark:border-amber-900">
      <CardHeader className="flex flex-row items-center justify-between bg-amber-50 dark:bg-amber-950/30">
        <CardTitle className="flex items-center gap-2">
          <span>📖</span> Bilgi Alanı (Wiki)
        </CardTitle>
        {canEdit && !isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Düzenle
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={10}
              className="w-full rounded-lg border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>Kaydet</Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                İptal
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {wiki.content}
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-700">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-green-600">
              👍 Yararlı ({wiki.usefulVotes})
            </button>
            <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-red-600">
              👎 Yararsız ({wiki.notUsefulVotes})
            </button>
          </div>
          <span className="text-xs text-zinc-400">
            Son düzenleme: {wiki.lastEditedBy?.username || "Anonim"} • v{wiki.version}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

