import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
              Logo
            </Link>
            <p className="mt-4 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
              Kısa açıklama metni buraya gelecek.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Bağlantılar
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              İletişim
            </h4>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-zinc-600 dark:text-zinc-400">
                info@example.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

