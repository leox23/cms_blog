import React from 'react'
import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm} from '../../components';


const PostDetails = ({ post }) => {
    console.log("Post.slug ",post.slug)
  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <PostDetail post={post}/>
                <Author author={post.author}/>
                <CommentsForm slug={post.slug}/>
                <Comments slug={post.slug}/>
            </div>

            <div className="col-span-1 lg:col-span-4">
                <div className="relative lg:sticky top-8"> 
                {/*
                esto iba en post widget, pero no renderiza el contenido, es para selecionar los que no sean el actual post, pero no funciona asi que lo dejare sin condicion
                slug={post.slug} categories={post.categories.map((category) => category.slug)} */}
                 <PostWidget />
                <Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails;
//asi es como "fetch data"/atraes la informacion usando getStaticProps() en nextjs
export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug)
    return {
      props: { 
          post: data,
      },
    };
}

export async function getStaticPaths() {
    const posts = await getPosts();
    return {
        paths: posts.map(({ node: { slug } }) => ({ params : {slug} })),
        fallback: false,
    };
}
