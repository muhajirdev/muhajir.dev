import { useState } from 'react'
import matter from 'gray-matter'

import Layout from '@components/layout'
import PostList from '@components/postlist'

const ContactForm = () => {
  return (
    <form>
      <input type="email" />
    </form>
  )
}

const Hero = () => {
  const [tryingToContact, contact] = useState(false)
  return (
    <div>
      <h1 className="font-mono text-6xl font-bold mt-32">Muhammad Muhajir</h1>
      <p className="mb-6 text-lg">Fullstack Developer</p>
      <button
        className="bg-black rounded text-base uppercase px-4 py-2 text-white"
        onClick={() => contact(true)}
      >
        Contact
      </button>
      {tryingToContact && <ContactForm />}
    </div>
  )
}

const index = ({ title, description, posts, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <main>
        <Hero />
        <div className="mt-24">
          <h1 className="text-3xl font-bold mb-4">Writings</h1>
          <PostList posts={posts} />
        </div>
      </main>
    </Layout>
  )
}

export default index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
