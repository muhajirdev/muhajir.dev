import Layout from '@components/layout'
import { getPost, getPosts } from 'lib/github-graphql-client'
import slug from 'slug'

import rehype from 'rehype'
import highlight from 'rehype-highlight'

export default function BlogPost({ title, bodyHTML }) {
  return (
    <Layout pageTitle={title}>
      <article className="max-w-4xl post">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: bodyHTML,
          }}
        ></div>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { post: postParam } = ctx.params
  const [id, slug] = postParam

  const post = await getPost(id)
  console.log('bodyHTML', post.bodyHTML)

  const reHTML = await rehype()
    .data('settings', { fragment: true })
    .use(highlight)
    .process(post.bodyHTML)

  return {
    props: {
      title: post.title,
      bodyHTML: reHTML.contents,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = posts.map((post) => `/post/${post.number}/${slug(post.title)}`)

  return {
    paths,
    fallback: false,
  }
}
