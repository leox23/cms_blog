/*
######################################################################
cualquier archivo dentro de la carpeta pages/api es mappeada 
dentro de /api/* para ser tratada como una 
API endpoint en ves de como una pagina
######################################################################
*/
import { GraphQLClient, gql} from "graphql"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      autorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, email: $email, comment: $comment, post:{ connect: {slug:$slug} } }) {id}
    }
  `

  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
}
