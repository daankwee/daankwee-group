export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
      <div className="container text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Daankwee Books. All rights reserved.
      </div>
    </footer>
  );
}