import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { BsThreeDots } from "react-icons/bs";

const PostDetailComment = dynamic(() => import("./Preview"), {
  ssr: true,
});

const PostImage = dynamic(() => import("./Image"), {
  ssr: true,
});

type CommentsProps = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps;
  comments: CommentsProps["comments"];
  savedBy: string[];
  likes: string[];
  handleClick: () => void;
};

const PreviewLargeScreen: FC<Props> = (props) => {
  const { post, comments, likes, savedBy, handleClick } = props;

  return (
    <>
      <div className="hidden shadow-sm lg:block">
        <PostImage post={post} />
      </div>
      <PostDetailComment
        comments={comments}
        likes={likes}
        savedBy={savedBy}
        post={post}
      >
        <button onClick={handleClick} name="menu" title="menu">
          <BsThreeDots size={20} />
        </button>
      </PostDetailComment>
    </>
  );
};
export default PreviewLargeScreen;
