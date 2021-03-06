import { useState } from 'react'
import matter from 'gray-matter'

import Layout from '@components/layout'
import PostList from '@components/postlist'
import ContactForm from '@components/contact'

import { getPosts } from 'lib/github-graphql-client'

const Hero = () => {
  const [tryingToContact, contact] = useState(false)
  return (
    <div>
      <h1 className="font-mono text-6xl font-bold mt-32">Muhammad Muhajir</h1>
      <p className="mb-6 text-lg">Fullstack Developer</p>
      {!tryingToContact && (
        <button
          className="bg-black rounded text-base uppercase px-4 py-2 text-white font-bold"
          onClick={() => contact(true)}
        >
          Contact
        </button>
      )}
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
          <h1 className="text-3xl font-bold mb-8">Writings</h1>
          <PostList posts={posts} />
        </div>
      </main>
    </Layout>
  )
}

export default index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)
  const posts = await getPosts()

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
