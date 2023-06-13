import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
export type IComment = Pick<IUserPostProps, "comments">;
import type { Session } from "next-auth";

type Props = {
  post: IUserPostProps;
  session: Session | null;
  comments: IComment["comments"];
};

export default function Comments({ post, session }: Props) {
  const { pathname } = useRouter();
  const { register, handleSubmit, resetField } = useForm();

  const defaultValues = {
    comments: "",
  };

  const handleSubmits = async (e: FieldValues) => {
    const { postComments } = await import("@/helper/comments");
    const { toast } = await import("react-hot-toast");

    if (e.comments === "") return toast.error("Please enter a comment");

    await postComments({
      e,
      post,
      session,
      resetField,
    });
  };

  return (
    <div
      className={pathname === "/post/[id]" ? "flex flex-col-reverse " : "block"}
    >
      <form
        className=" flex items-center px-3 py-1"
        onSubmit={handleSubmit(handleSubmits)}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          autoComplete="off"
          defaultValue={defaultValues.comments}
          {...register("comments")}
          className="w-full bg-transparent text-xs focus:outline-none"
        />
        <button type="submit" name="share comment" title="share comment">
          <AiOutlineSend className="text-xl md:text-2xl" />
        </button>
      </form>
    </div>
  );
}
