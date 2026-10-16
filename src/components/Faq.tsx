export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col border-t border-border">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-border py-5">
          <summary className="flex justify-between gap-4 text-[19px] font-semibold text-navy">
            {item.q}
            <span aria-hidden="true" className="text-2xl leading-none text-accent group-open:hidden">+</span>
            <span aria-hidden="true" className="hidden text-2xl leading-none text-accent group-open:inline">−</span>
          </summary>
          <p className="mt-3.5 text-[17px] leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
