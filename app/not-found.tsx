import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-dvh grid place-items-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm/6 text-neutral-400">Check the URL or go home.</p>
        <Link href="/" className="mt-4 inline-block underline">
          Go home
        </Link>
      </div>
    </main>
  )
}
