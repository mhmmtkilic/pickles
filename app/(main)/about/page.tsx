import { Card, CardHeader, CardTitle, CardContent } from "@/components";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-white">
        Hakkımızda
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Misyonumuz</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Misyon açıklaması buraya gelecek. Şirketinizin veya projenizin
              temel amacını ve hedeflerini anlatın.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vizyonumuz</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Vizyon açıklaması buraya gelecek. Gelecekte ulaşmak istediğiniz
              hedefleri ve hayallerinizi paylaşın.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

