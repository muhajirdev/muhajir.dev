import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="w-full shadow py-8 px-32">
        <nav className="flex justify-between">
          <Link href="/">
            <a className="font-mono font-bold">muhajir.dev</a>
          </Link>
        </nav>
      </header>
    </>
  )
}
