export default function Team() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Our Team</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Patrick Lurlay', role: 'Founder & Publisher', bio: 'Engineering leader turned cultural storyteller.' },
          { name: 'Tamzin', role: 'Art & Ceramics', bio: 'Visual direction and tactile storytelling.' },
          { name: 'Advisors', role: 'Education & Culture', bio: 'Teachers and librarians guiding classroom use.' },
        ].map((p) => (
          <div key={p.name} className="rounded-xl border dark:border-gray-800 p-6">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{p.role}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{p.bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
}