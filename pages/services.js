export default function Services() {
  return (
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Services</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Technology Consulting</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>IT Modernization &amp; Cloud Infrastructure</li>
            <li>Digital Transformation &amp; Process Optimization</li>
            <li>AI Integration &amp; Automation Strategy</li>
            <li>Systems Architecture &amp; Infrastructure Development</li>
            <li>Web &amp; App Development (Next.js, Node.js, React, Prisma)</li>
            <li>Technical Leadership &amp; Fractional CTO Services</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Educational &amp; Cultural Programs</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Author School Visits &amp; Workshops — tailored for grades K–6</li>
            <li>Custom Multilingual Classroom Packs (PDF + Activity Sheets)</li>
            <li>Story Licensing for Nonprofit Literacy Programs</li>
            <li>Community Storytelling Events &amp; Cultural Presentations</li>
            <li>Publishing Collaborations &amp; Local Partnerships</li>
          </ul>
        </section>

        <section className="text-center">
          <p className="mb-4 text-lg">Ready to collaborate or request a custom workshop?</p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </section>
      </main>
  )
}