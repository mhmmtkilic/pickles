"use client";

import { useState } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { CoinBalance } from "@/components/coin";
import { KULTUR_KART_CONVERSION_RATE } from "@/constants";

export default function CoinTransferPage() {
  const [amount, setAmount] = useState("");
  const currentBalance = 4750;

  const coinAmount = parseInt(amount) || 0;
  const kartPoints = Math.floor(coinAmount / KULTUR_KART_CONVERSION_RATE);

  const handleTransfer = () => {
    // TODO: API çağrısı
    console.log("Transfer:", { coinAmount, kartPoints });
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Coin'leri Karta Aktar
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Mevcut Bakiye</CardTitle>
        </CardHeader>
        <CardContent>
          <CoinBalance amount={currentBalance} size="lg" />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transfer İşlemi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Dönüşüm Oranı:</strong> {KULTUR_KART_CONVERSION_RATE} GençCoin = 1 Kültür Kart Puanı
            </p>
          </div>

          <Input
            id="amount"
            type="number"
            label="Transfer Edilecek GençCoin"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Örn: 1000"
          />

          {coinAmount > 0 && (
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Kazanılacak Puan:
                </span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  +{kartPoints} Puan
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={handleTransfer}
            disabled={coinAmount < KULTUR_KART_CONVERSION_RATE || coinAmount > currentBalance}
            className="w-full"
          >
            Transfer Et
          </Button>

          {coinAmount > currentBalance && (
            <p className="text-center text-sm text-red-500">
              Yetersiz bakiye
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

