import dynamic from "next/dynamic";
import { IUser } from "@/types/user";
import { IUserPostProps } from "@/types/post";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"),
  { ssr: true }
);
const PostLoader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});
const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});

type Props = {
  posts: IUserPostProps[];
  users: IUser[];
};

function Home({ posts, users }: Props) {
  const [newPosts, setNewPosts] = useState<IUserPostProps[]>([]);
  useEffect(() => {
    const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        const { fetchNextPosts } = await import("@/helper/getPosts");
        const newPosts = await fetchNextPosts(posts[posts.length - 1]);
        setNewPosts(newPosts ?? []);
      }
    };

    const observer = new IntersectionObserver(handleIntersection);
    const entry = document.getElementById("entry");
    if (entry) {
      observer.observe(entry);
    }
    return () => {
      if (entry) {
        observer.unobserve(entry);
        observer.disconnect();
        setNewPosts([]);
      }
    };
  }, []);

  return (
    <div className="h-screen ">
      <div className="flex h-screen w-full items-start justify-between overflow-y-auto">
        <div className="w-full">
          {posts?.map((post) => (
            <div key={post.postId}>
              <PostCard post={post} />
            </div>
          ))}
          <div id="entry"></div>
          {newPosts.length === 0 ? (
            <PostLoader />
          ) : (
            newPosts?.map((post) => <PostCard post={post} key={post.postId} />)
          )}
        </div>
        <div className="sticky top-0 h-screen">
          <Suggestions reccomend={users} />
        </div>
      </div>
    </div>
  );
}
export default Home;

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const { getPosts } = await import("@/helper/getPosts");
  const { getUserRecommendation } = await import("@/helper/getUser");
  const { getSession } = await import("next-auth/react");
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const users = await getUserRecommendation(session?.user.uid, 5);
  const posts = await getPosts(3);

  res.setHeader("Cache-Control", "public, maxage=60, stale-while-revalidate");

  return {
    props: {
      users,
      posts,
      session,
    },
  };
}
