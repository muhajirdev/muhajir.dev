import Head from 'next/head'
import Header from './header'
import Footer from '@components/footer'

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section>
        <Header />
        <div className="px-64 py-8">{children}</div>
      </section>
      <Footer />
    </>
  )
}
