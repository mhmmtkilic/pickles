import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
  roleColor?: string;
  className?: string;
}

export function Avatar({ 
  src, 
  alt, 
  fallback, 
  size = "md",
  roleColor,
  className 
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full font-semibold text-white",
        sizeClasses[size],
        className
      )}
      style={{ 
        backgroundColor: roleColor || "#f59e0b",
      }}
    >
      {src ? (
        <img src={src} alt={alt || fallback} className="h-full w-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}

