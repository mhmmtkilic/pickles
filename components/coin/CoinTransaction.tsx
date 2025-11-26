import { CoinTransaction as CoinTransactionType } from "@/types";
import { cn } from "@/lib/utils";

interface CoinTransactionProps {
  transaction: CoinTransactionType;
}

export function CoinTransactionItem({ transaction }: CoinTransactionProps) {
  const isPositive = transaction.amount > 0;

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-zinc-900 dark:text-white">
          {transaction.description}
        </p>
        <p className="text-sm text-zinc-500">
          {new Date(transaction.createdAt).toLocaleDateString("tr-TR")}
        </p>
      </div>
      <span
        className={cn(
          "font-semibold",
          isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}
      >
        {isPositive ? "+" : ""}{transaction.amount} 🪙
      </span>
    </div>
  );
}

