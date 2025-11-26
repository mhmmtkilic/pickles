"use client";

import Image from "next/image";
import { Button, Card, CardContent } from "@/components";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Profil Header */}
      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
            JD
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            John Doe
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">@johndoe</p>
          <p className="mt-2 max-w-md text-zinc-700 dark:text-zinc-300">
            Frontend Developer | React & Next.js | Açık kaynak tutkunu 🚀
          </p>
          <div className="mt-4 flex justify-center gap-6 sm:justify-start">
            <div className="text-center">
              <p className="text-xl font-bold text-zinc-900 dark:text-white">128</p>
              <p className="text-sm text-zinc-500">Gönderi</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-zinc-900 dark:text-white">1.2K</p>
              <p className="text-sm text-zinc-500">Takipçi</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-zinc-900 dark:text-white">350</p>
              <p className="text-sm text-zinc-500">Takip</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-3 sm:justify-start">
            <Button variant="primary" size="sm">Profili Düzenle</Button>
            <Button variant="outline" size="sm">Paylaş</Button>
          </div>
        </div>
      </div>

      {/* Gönderiler Grid */}
      <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
          Gönderiler
        </h2>
        <div className="grid grid-cols-3 gap-1 sm:gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-zinc-200 transition-opacity hover:opacity-80 dark:bg-zinc-800"
            >
              <div className="flex h-full w-full items-center justify-center text-zinc-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

