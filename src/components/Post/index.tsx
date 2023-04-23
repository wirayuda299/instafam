import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import usePost from "@/hooks/usePost";
import { useSession } from "next-auth/react";
import {
  useDarkModeStore,
  useMenuModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { memo } from "react";
import { useStore } from "zustand";
import { BsThreeDots } from "react-icons/bs";

const Likes = dynamic(() => import("./Likes"));
const ActionButton = dynamic(() => import("./ActionButton"));
const PostHeader = dynamic(() => import("../Header/PostHeader"));
const Author = dynamic(() => import("./Author"));
const Comments = dynamic(() => import("../Comments/Forms"));
const PostImage = dynamic(() => import("./Image"));
const Buttons = dynamic(() => import("../Buttons/Buttons"));

type Props = {
  post: IUserPostProps;
};

function PostCard({ post }: Props) {
  const { likes, comments, savedBy } = usePost(post);
  const { data: session } = useSession();
  const { darkMode } = useStore(useDarkModeStore);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { menuModal, setMenuModal } = useStore(useMenuModalStore);

  const handleClick = () => {
    setMenuModal(!menuModal);
    setSelectedPost(post);
  };


  return (
    <div className={`relative mb-5 w-full`}>
      <div
        className={`rounded-sm shadow-lg  ${darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
      >
        <PostHeader post={post}>
          <div>
            <Buttons
              type="button"
              name="menu"
              title="menu"
              onClick={handleClick}
            >
              <BsThreeDots className="text-gray-500" size={20} />
            </Buttons>
          </div>
        </PostHeader>
        <PostImage post={post} />
        <ActionButton
          savedBy={savedBy}
          likes={likes}
          post={post}
          uid={session?.user?.uid as string}
        />
        <Likes likesCount={likes} session={session} />
        <Author post={post} />
        <Comments comments={comments} post={post} session={session} />
      </div>
    </div>
  );
}
export default memo(PostCard);