const { graphql } = require('@octokit/graphql')

const TOKEN = process.env.TOKEN

const request = graphql.defaults({
  headers: {
    authorization: `token ${TOKEN}`,
  },
})

export const getPosts = () =>
  request(
    `{
    repository(name: "muhajir.dev", owner: "muhajirdev") {
      issues(first: 50) {
        nodes {
          title
          number
          createdAt
          body
          bodyHTML
        }
      }
    }
  }
`
  ).then((data) => data.repository.issues.nodes)

export const getPost = (number) => {
  return request(
    `query getPost($number: Int!){
      repository(name: "muhajir.dev", owner: "muhajirdev") {
        issue(number: $number) {
            title
            number
            createdAt
            body
            bodyHTML
        }
      }
  }
`,
    {
      number: Number(number),
    }
  ).then((data) => data.repository.issue)
}
