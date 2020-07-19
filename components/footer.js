export default function Footer() {
  return (
    <div className="flex flex-col items-center py-4">
      <Social />
      <Tech />
    </div>
  )
}
const Social = () => (
  <div>
    Reach me on twitter <a href="https://twitter.com/muhajirdev">@muhajirdev</a>
  </div>
)

const Tech = () => (
  <div>
    This site is built with <a href="https://nextjs.org/">NextJS</a>, hosted on{' '}
    <a href="https://netlify.com">Netlify</a>, and uses{' '}
    <a href="https://github.com/muhajirdev/muhajir.dev/issues">
      Github Issues{' '}
    </a>{' '}
    as CMS
  </div>
)
