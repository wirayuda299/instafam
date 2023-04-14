import Head from "next/head";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
const ExplorePostCard = dynamic(() => import("@/components/Card/Feeds"), {
  ssr: true,
});
const CardLoader = dynamic(() => import("@/components/Loader/Loader"), {
  ssr: true,
});

export default function Explore({
  posts,
  last,
}: {
  posts: IUserPostProps[];
  last: IUserPostProps;
}) {
  const { ref, postsState, loading } = useInfiniteScroll(last);
  return (
    <>
      <Head>
        <title>Explore popular posts &#8226; Instafam</title>
        <meta
          name="description"
          content="Explore new posts and discover new accounts on Instafam."
        />
      </Head>
      <div className="h-screen w-full overflow-y-auto p-5 text-black dark:text-white">
        <h1 className="py-5 text-center text-5xl font-semibold">Explore</h1>
        <div className="mb-7 w-full columns-1 gap-10 sm:columns-2 lg:columns-3">
          {posts?.map((post: IUserPostProps) => (
            <ExplorePostCard post={post} key={post.postId} />
          ))}
          <span ref={ref}></span>
          {loading && <CardLoader />}
          {postsState?.map((post) => (
            <ExplorePostCard post={post} key={post.postId} />
          ))}
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const { getPosts } = await import("@/helper/getPosts");
  const posts = await getPosts(10);
  const last = posts ? posts[posts.length - 1] : null;

  return {
    props: {
      posts,
      last,
    },
    revalidate: 60,
  };
}
