import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PolicyArticle({
  eyebrow,
  title,
  sections
}: {
  eyebrow: string;
  title: string;
  sections: Array<{ title: string; body: string }>;
}) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link href="/policies" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <ArrowLeft size={16} aria-hidden="true" />
        Tất cả chính sách
      </Link>
      <p className="mt-8 text-sm font-semibold uppercase text-primary">{eyebrow}</p>
      <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
      <div className="mt-8 grid gap-4">
        {sections.map((section) => (
          <section key={section.title} className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

