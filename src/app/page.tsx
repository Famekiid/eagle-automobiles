export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-50">
            Eagle Automobiles
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Premium Vehicle Inventory & Finance Management
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/inventory"
              className="rounded-lg bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              View Inventory
            </a>
            <a
              href="/contact"
              className="rounded-lg border-2 border-gray-300 dark:border-gray-700 px-6 py-3 font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
