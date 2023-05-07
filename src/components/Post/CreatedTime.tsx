import { useStateContext } from "@/stores/StateContext";
import { getCreatedDate } from "@/utils/postDate";
import Link from "next/link";
type Props ={
  author: string;
  createdAt: string | number;
}

export default function CreatedTime({ createdAt, author }: Props) {
  const createdAtTime = getCreatedDate(createdAt);
  const {
    state: { postModal },
    Dispatch,
  } = useStateContext();
  return (
    <div className={`ml-3 flex w-full items-center justify-between`}>
      <div>
        <div>
          <div>
            <Link
              onClick={() =>
                postModal
                  ? Dispatch({
                      type: "TOGGLE_POST_MODAL",
                      payload: {
                        postModal: false,
                      },
                    })
                  : null
              }
              href={`/profile/${author}`}
              prefetch={false}
              className="block text-sm font-semibold leading-tight antialiased"
            >
              {author}
            </Link>
          </div>
          <span
            className={`block text-left font-thin leading-tight text-gray-500 antialiased xs:text-[10px] sm:text-xs `}
          >
            {createdAt}
          </span>
        </div>
      </div>
    </div>
  );
}
