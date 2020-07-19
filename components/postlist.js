import Link from 'next/link'
import slug from 'slug'

const getDescription = (text, length = 45) =>
  text.split('').slice(0, length).join('') + '...'

export default function PostList({ posts }) {
  return (
    <div>
      {posts.length <= 0 && <div>No posts!</div>}
      <div className="flex -mx-8 flex-wrap">
        {posts &&
          posts.map((post) => {
            const postSlug = slug(post.title)
            return (
              <Link
                href={'/post/[...post]'}
                as={`/post/${post.number}/${postSlug}`}
                key={postSlug}
              >
                <a className="mb-8 shadow-md rounded-md h-64 p-6 w-64 mx-8 flex flex-col justify-between">
                  <h2 className="text-xl tracking-wide font-bold">
                    {post.title}
                  </h2>
                  <div>
                    <p className="pb-6 text-gray-700">
                      {getDescription(post.bodyText)}
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
