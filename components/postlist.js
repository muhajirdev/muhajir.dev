import Link from 'next/link'

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <div className="flex -mx-8">
        {posts &&
          posts.map((post) => {
            return (
              <Link
                href={'/post/[postname]'}
                as={`/post/${post.slug}`}
                key={post.slug}
              >
                <a className="mb-4 shadow-md rounded-md h-64 p-6 w-64 mx-8 flex flex-col justify-between">
                  <h2 className="text-xl tracking-wide font-bold">
                    {post.frontmatter.title}
                  </h2>
                  <div>
                    <p className="pb-6 text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing...
                    </p>
                    <div className="border-b-4 w-24" />
                  </div>
                </a>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
