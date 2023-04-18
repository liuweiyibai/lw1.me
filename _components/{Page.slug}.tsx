import * as React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import { Container, Box, Heading } from "./ui"
import SEOHead from "./head"

interface PageProps {
  data: {
    page: {
      id: string
      title: string
      slug: string
      description: string
      image: { id: string; url: string }
      html: string
    }
  }
}

export default function Page(props: PageProps) {
  const { page } = props.data

  return (
    <Layout>
      <Box paddingY={5}>
        <Container width="narrow">
          <Heading as="h1">{page?.title}</Heading>
          <div
            dangerouslySetInnerHTML={{
              __html: page.html,
            }}
          />
        </Container>
      </Box>
    </Layout>
  )
}
export const Head = (props: PageProps) => {
  const { page } = props.data
  return <SEOHead {...page} />
}
export const query = graphql`
  query PageContent($id: String!) {
    page(id: { eq: $id }) {
      id
      title
      slug
      description
      image {
        id
        url
      }
      html
    }
  }
`