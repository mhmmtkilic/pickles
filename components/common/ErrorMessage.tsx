import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorMessage({
  title = "Bir hata oluştu",
  message,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950",
        className
      )}
    >
      <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">
        {title}
      </h4>
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
}

