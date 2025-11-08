export default function FAQ() {
  const rows = [
    { q: 'Do I need an app to read your PDFs?', a: 'No—any modern device can open the files. We optimize for tablets and laptops.' },
    { q: 'Are your stories classroom-friendly?', a: 'Yes. We include optional activity prompts and multilingual vocabulary hints.' },
    { q: 'Do you offer bulk pricing for schools?', a: 'Yes. Contact us for classroom packs and annual licenses.' },
    { q: 'What languages do you support?', a: 'English first, then French, Dutch, and selected Liberian languages.' },
  ];
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {rows.map((r, i) => (
          <details key={i} className="rounded-xl border dark:border-gray-800 p-4">
            <summary className="cursor-pointer font-semibold">{r.q}</summary>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{r.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}