"use client";

import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
        Ayarlar
      </h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input
                id="name"
                type="text"
                label="Ad Soyad"
                defaultValue="John Doe"
              />
              <Input
                id="email"
                type="email"
                label="E-posta"
                defaultValue="john@example.com"
              />
              <Button type="submit">Kaydet</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Şifre Değiştir</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input
                id="currentPassword"
                type="password"
                label="Mevcut Şifre"
                placeholder="••••••••"
              />
              <Input
                id="newPassword"
                type="password"
                label="Yeni Şifre"
                placeholder="••••••••"
              />
              <Input
                id="confirmPassword"
                type="password"
                label="Yeni Şifre Tekrar"
                placeholder="••••••••"
              />
              <Button type="submit">Şifreyi Güncelle</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

