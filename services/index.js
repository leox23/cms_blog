import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  //lo que esta dentro de los backticks se saca en graphQL con graphCMS Playground, seleccionando que es lo que necesitas
  const query = gql`
    query MyQuery {
        postsConnection {
        edges {
            node {
                author {
                    bio
                    name
                    id
                    photo {
                    url
                    }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
            url
            }
            categories {
                name
                slug
            }
            }
        }
        }
    }  
    `;
  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
}
