"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "GEZGIN-ALI-2024";
  const referralLink = `https://konyagenc.wiki/kayit?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Arkadaşını Davet Et
      </h1>

      <Card className="mb-6">
        <CardContent className="pt-6 text-center">
          <span className="text-6xl">🎁</span>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
            İkiniz de 100 GençCoin Kazanın!
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Arkadaşın senin davet linkinle kayıt olduğunda, ikiniz de 100 GençCoin kazanırsınız.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Davet Linkin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              id="referral"
              value={referralLink}
              readOnly
              className="flex-1"
            />
            <Button onClick={handleCopy}>
              {copied ? "✓ Kopyalandı" : "Kopyala"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-zinc-500">veya kodu paylaş</p>
            <p className="mt-2 rounded-lg bg-zinc-100 py-2 font-mono text-lg font-bold text-zinc-900 dark:bg-zinc-800 dark:text-white">
              {referralCode}
            </p>
          </div>

          <div className="border-t border-zinc-200 pt-4 dark:border-zinc-700">
            <h3 className="font-medium text-zinc-900 dark:text-white">
              Davet İstatistiklerin
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">12</p>
                <p className="text-sm text-zinc-500">Davet Edilen</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">1,200</p>
                <p className="text-sm text-zinc-500">Kazanılan Coin</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

