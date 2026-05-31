import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "primary"
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "primary" | "wood" | "accent";
}) {
  const color = tone === "wood" ? "text-wood" : tone === "accent" ? "text-accent" : "text-primary";

  return (
    <article className="rounded-lg border border-line bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-charcoal">{value}</p>
        </div>
        <Icon className={color} size={24} aria-hidden="true" />
      </div>
    </article>
  );
}

