"use client";

import { cn } from "@/lib/utils";

interface CoinBalanceProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function CoinBalance({ 
  amount, 
  size = "md", 
  showIcon = true,
  className 
}: CoinBalanceProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400",
        {
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-xl": size === "lg",
        },
        className
      )}
    >
      {showIcon && (
        <span className={cn({
          "text-base": size === "sm",
          "text-lg": size === "md",
          "text-2xl": size === "lg",
        })}>
          🪙
        </span>
      )}
      <span>{amount.toLocaleString()}</span>
      <span className="text-zinc-500 dark:text-zinc-400">GençCoin</span>
    </div>
  );
}

