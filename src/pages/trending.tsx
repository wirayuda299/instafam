import {
  useFeedModalStore,
  usePostModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { AiOutlineSearch } from "react-icons/ai";
import { useStore } from "zustand";

type Props = {
  posts: IUserPostProps[];
  lastPost: IUserPostProps | null;
};

const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});

const Form = dynamic(() => import("@/components/Search/Form"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});
const PostInfo = dynamic(() => import("@/components/Feeds/PostInfo"), {
  ssr: true,
});

export default function Trending({ posts }: Props) {
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostModal } = useStore(usePostModalStore);
  const { setFeedModal } = useStore(useFeedModalStore);
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="md:hidden p-3 md:pointer-events-none">
        <Form height="h-min">
          <button type="submit" name="Search" title="search">
            <AiOutlineSearch size={20} />
          </button>
        </Form>
      </div>
      <div className="columns-3xs m-0">
        {posts?.map((post, i) => (
          <div key={`${post.postId}`}>
            <button
              name="click to view the post"
              title="click to view the post"
              className={`hidden relative mb-5 w-full h-full  group md:block ${ Number(post.createdAt) % 2 === 0 ? "aspect-square" : "aspect-[9/16]"
                }`}
              onClick={() => {
                setSelectedPost(post);
                setFeedModal(true);
              }}
            >
              <PostImage
                post={post}
                classNames="h-full w-full object-cover object-top rounded-md"
              />
              <PostInfo post={post}/>
            </button>
            <div
              onClick={() => {
                setSelectedPost(post);
                setPostModal(true);
              }}
              className={`block w-full cursor-pointer md:hidden md:pointer-events-none`}
            >
              <PostImage
                post={post}
                classNames={`h-full w-full border border-gray-400 border-opacity-40 object-cover object-top ${i % 2 === 0 ? "aspect-video" : "aspect-square"
                  }`} />
            </div>
          </div>
        ))}
      </div>

     
      <Footer classNames="flex flex-wrap gap-3 text-xs  text-gray-500 transition-all ease mt-10 justify-center">
        <p
          className='mt-5 w-full text-xs text-center text-gray-500'
        >
          © 2023 INSTAFAM by{" "}
          <a href="https://instafam.vercel.app" className="pr-1">
            Instafam
          </a>
          from <a href="https://instafam.vercel.app">INSTAFAM</a>
        </p>
      </Footer>
      <br className="md:hidden" />
      <br className="md:hidden" />
      <br className="md:hidden" />
    </div>
  );
}

export async function getServerSideProps({ res }: any) {
  const { getAllPosts } = await import("@/helper/getPosts");
  const response = await getAllPosts();
  const posts = response.sort((a, b) => b.likedBy.length - a.likedBy.length);

  res.setHeader("Cache-Control", "public, maxage=60, stale-while-revalidate");
  return {
    props: {
      posts,
    },
  };
}
