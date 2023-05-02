import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { useStateContext } from "@/stores/StateContext";
const PostImage = dynamic(() => import("../Post/Image"), { ssr: true });
const PostInfo = dynamic(() => import("./PostInfo"), { ssr: true });

type Props = {
  post: IUserPostProps;
  index: number;
};

export default function Feeds({ post, index }: Props) {
  const { Dispatch } = useStateContext();
  return (
    <div
      key={post.postId}
      className={`group relative`}
      onClick={() => {
        Dispatch({
          type: "SELECT_POST",
          payload: {
            post,
          }
        })

       Dispatch({
        type: 'TOGGLE_FEED_MODAL',
        payload: {
          feedModal: true
        }
       })
      }}
    >
      <PostImage
        post={post}
        priority={true}
        classNames={` h-full w-full object-cover object-center xs:object-top ${index % 2 === 0 ? "aspect-video md:aspect-square" : "aspect-square "
          }`} />
      <div className="hidden md:block">
        <PostInfo post={post} />
      </div>
    </div>
  );
}
