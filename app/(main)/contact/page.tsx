"use client";

import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-white">
        İletişim
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Bize Ulaşın</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              id="name"
              type="text"
              label="Ad Soyad"
              placeholder="John Doe"
            />
            <Input
              id="email"
              type="email"
              label="E-posta"
              placeholder="ornek@email.com"
            />
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Mesajınız
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Mesajınızı buraya yazın..."
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
              />
            </div>
            <Button type="submit" className="w-full">
              Gönder
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

