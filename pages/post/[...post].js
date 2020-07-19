import Layout from '@components/layout'
import { getPost, getPosts } from 'lib/github-graphql-client'
import slug from 'slug'

import markdown from 'remark-parse'
import images from 'remark-images'
import markdown2rehype from 'remark-rehype'
import unified from 'unified'
import highlight from 'rehype-highlight'
import html from 'rehype-stringify'
import raw from 'rehype-raw'

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
  console.log('bodyHTML', post.body)

  const reHTML = await unified()
    .use(markdown)
    .use(images)
    .use(markdown2rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(highlight)
    .use(html)
    .process(post.body)

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
