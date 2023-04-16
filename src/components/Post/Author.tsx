import { IUserPostProps } from "@/types/post";
import { memo, useMemo, useState } from "react";

 function Author({ post }: { post: IUserPostProps }) {
  const [show, setShow] = useState(false);
  const posthastag = useMemo<string[]>(() => post.hashtags, [post])
  const captions = useMemo<string>(() => post.captions[0], [post])
  
  return (
    <div className="overflow-hidden">
      <div
        className={`flex max-w-[250px] items-start  space-x-2 ${
          show ? "!max-w-fit flex-wrap" : ""
        }`}
       
      >
        <h3 className="pb-2 text-sm font-medium sm:font-semibold">
          {post?.author}
        </h3>
        <p
          className={` text-sm font-thin text-black dark:text-white ${
            captions.length >= 20 && !show ? "truncate" : ""
          }`}
        >
          {post.captions}
        </p>
        <button className="text-sm text-gray-400 !ml-0"  onClick={() => setShow(!show)}>
          {captions.length >= 20 && !show ? (
            <span className="font-semibold ">more</span>
          ) : (
            <span
              className={`font-semibold ml-1 ${
                captions.length < 20 ? "hidden" : "block"
              }`}
            >
              hide
            </span>
          )}
        </button>
      </div>
      <div className="flex flex-wrap">
        {posthastag.map((hashtag) => (
          <span
            key={hashtag}
            className="pr-1 text-xs font-normal text-blue-500"
          >
            {hashtag}
          </span>
        ))}
      </div>
    </div>
  );
}
export default memo(Author)
