"use client";

import Link from "next/link";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Kayıt Ol</CardTitle>
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
            <Input
              id="password"
              type="password"
              label="Şifre"
              placeholder="••••••••"
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Şifre Tekrar"
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full">
              Kayıt Ol
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Zaten hesabınız var mı?{" "}
            <Link
              href="/login"
              className="font-medium text-zinc-900 hover:underline dark:text-white"
            >
              Giriş Yap
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

