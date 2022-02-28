import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services'

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
{/* lo que sigue sera nuestro home component, home root  */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
        {posts.map((post) => <PostCard post={post.node} key={post.title} /> )}
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}


//asi es como "fetch data"/atraes la informacion usando getStaticProps() en nextjs

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}