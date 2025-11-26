"use client";

import { Sidebar } from "@/components";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Ayarlar", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 bg-zinc-50 p-8 dark:bg-zinc-950">{children}</main>
    </div>
  );
}

