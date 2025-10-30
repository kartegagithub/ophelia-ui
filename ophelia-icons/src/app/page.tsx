import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          🎨 Ophelia Icons
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          A beautiful collection of modern icons with advanced customization options
        </p>
        <div className="space-y-4">
          <Link 
            href="/icons-preview"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            View Icon Library
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            22 icons available
          </div>
        </div>
      </div>
    </div>
  )
}
