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
          bodyHTML
        }
      }
    }
  }
`
  ).then((data) => data.repository.issues.nodes)

export const getPost = (number) => {
  console.log('requesting with number', number)
  return request(
    `query getPost($number: Int!){
      repository(name: "muhajir.dev", owner: "muhajirdev") {
        issue(number: $number) {
            title
            number
            createdAt
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
