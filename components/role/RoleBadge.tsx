import { UserRole } from "@/types";
import { ROLES } from "@/constants";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: UserRole;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const roleIcons: Record<UserRole, string> = {
  yeni_gelen: "🌱",
  seyyah: "🚶",
  gezgin: "🧭",
  kasif_meraklisi: "🔍",
  konya_bilgesi: "👑",
};

export function RoleBadge({ 
  role, 
  showIcon = true, 
  size = "md",
  className 
}: RoleBadgeProps) {
  const roleInfo = ROLES[role];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-2.5 py-1 text-sm": size === "md",
          "px-3 py-1.5 text-base": size === "lg",
        },
        className
      )}
      style={{ 
        backgroundColor: `${roleInfo.color}20`,
        color: roleInfo.color,
      }}
    >
      {showIcon && <span>{roleIcons[role]}</span>}
      {roleInfo.turkishName}
    </span>
  );
}

