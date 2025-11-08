export default function Home() {
  return (
    <main className="container py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-3">Stories that travel farther than borders</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Daankwee Books publishes children’s stories inspired by Liberian folktales — in print, PDF, and multilingual editions.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/products" className="btn">Shop PDFs</a>
          <a href="/about" className="btn-outline">Learn more</a>
        </div>
      </section>
      <section className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="rounded-xl border dark:border-gray-800 p-6">
            <h3 className="font-semibold mb-2">Featured Story {i}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">A short teaser about the story. Multilingual, kid-friendly, teacher-approved.</p>
          </div>
        ))}
      </section>
    </main>
  );
}