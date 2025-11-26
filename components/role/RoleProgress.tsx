"use client";

import { UserRole } from "@/types";
import { ROLES } from "@/constants";
import { ProgressBar } from "@/components/ui";
import { RoleBadge } from "./RoleBadge";

interface RoleProgressProps {
  currentCoin: number;
  currentRole: UserRole;
}

const roleOrder: UserRole[] = [
  "yeni_gelen",
  "seyyah",
  "gezgin",
  "kasif_meraklisi",
  "konya_bilgesi",
];

export function RoleProgress({ currentCoin, currentRole }: RoleProgressProps) {
  const currentRoleInfo = ROLES[currentRole];
  const currentIndex = roleOrder.indexOf(currentRole);
  const nextRole = roleOrder[currentIndex + 1];
  const nextRoleInfo = nextRole ? ROLES[nextRole] : null;

  const progressInCurrentRole = currentCoin - currentRoleInfo.minCoin;
  const roleRange = currentRoleInfo.maxCoin - currentRoleInfo.minCoin;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <RoleBadge role={currentRole} size="md" />
        {nextRoleInfo && (
          <span className="text-sm text-zinc-500">
            Sonraki: {nextRoleInfo.turkishName}
          </span>
        )}
      </div>
      
      {nextRoleInfo ? (
        <>
          <ProgressBar
            value={progressInCurrentRole}
            max={roleRange}
            color={currentRoleInfo.color}
            size="md"
          />
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-white">
              {(nextRoleInfo.minCoin - currentCoin).toLocaleString()}
            </span>{" "}
            GençCoin daha kazanarak{" "}
            <span style={{ color: nextRoleInfo.color }} className="font-semibold">
              {nextRoleInfo.turkishName}
            </span>{" "}
            ol!
          </p>
        </>
      ) : (
        <p className="text-center text-sm text-amber-600 dark:text-amber-400">
          🎉 En yüksek seviyeye ulaştın!
        </p>
      )}
    </div>
  );
}

