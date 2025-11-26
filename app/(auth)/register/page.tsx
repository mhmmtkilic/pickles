"use client";

import Link from "next/link";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 px-4 dark:from-zinc-950 dark:to-zinc-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <span className="text-4xl">📚</span>
          <CardTitle className="text-2xl">Konya Genç WikiSözlük</CardTitle>
          <p className="text-sm text-zinc-500">Kayıt Ol</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input id="username" type="text" label="Kullanıcı Adı" placeholder="ornek_kullanici" />
            <Input id="email" type="email" label="Üniversite E-postası (.edu.tr)" placeholder="ornek@selcuk.edu.tr" />
            <Input id="kulturKartId" type="text" label="Genç Kültür Kart ID" placeholder="GK-XXXXXX" />
            <Input id="password" type="password" label="Şifre" placeholder="••••••••" />
            <Input id="confirmPassword" type="password" label="Şifre Tekrar" placeholder="••••••••" />
            <Button type="submit" className="w-full">Kayıt Ol</Button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Zaten hesabın var mı?{" "}
            <Link href="/login" className="font-medium text-amber-600 hover:underline dark:text-amber-400">
              Giriş Yap
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
