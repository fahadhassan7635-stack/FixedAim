import { notFound } from 'next/navigation';
import { NON_DEFAULT_LANGS, type Lang } from '@/lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return NON_DEFAULT_LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!(NON_DEFAULT_LANGS as string[]).includes(lang)) {
    notFound();
  }

  const typedLang = lang as Lang;
  const dir = typedLang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div lang={typedLang} dir={dir}>
      {children}
    </div>
  );
}
