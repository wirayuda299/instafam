import Modal from "@/components/Modal";
import { useMenuModalStore, useReportModalStore, useSelectedPostStore } from "@/stores/stores";
import { IUser } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "zustand";

type Props = {
  menuModal: boolean;
  user: IUser | null;
  session: any
}

export default function Menu({ menuModal, session, user }: Props) {
  const { setReportModal } = useStore(useReportModalStore);
  const { selectedPost, setSelectedPost } = useStore(useSelectedPostStore);
  const { setMenuModal } = useStore(useMenuModalStore);
  const { replace, asPath } = useRouter();
  const refreshData = () => replace(asPath);

  const handleCLose = () => {
    setSelectedPost(null);
    setMenuModal(false);
  };

  const buttonLists = [
    {
      id: 1,
      name: selectedPost?.postedById === session?.user.uid ? "Edit" : "Report",
      event: () => {
        selectedPost?.postedById === session?.user?.uid
          ? undefined
          : setReportModal(true);
        setMenuModal(false);
      },
    },
    {
      id: 2,
      name:
        selectedPost?.postedById === session?.user.uid
          ? "Delete"
          : user?.following.find(
            (user: { userId: string }) => user.userId === selectedPost?.postedById
          )
            ? "Unfollow"
            : "Follow",
      event: async () => {
        if (selectedPost?.postedById === session?.user.uid) {
          const { deletePost } = await import("@/helper/deletePost");
          const deletePostsArgs = {
            post: selectedPost,
            refreshData,
            ssr: true,
            session,
          };
          deletePost(deletePostsArgs);

        } else {
          const { handleFollow } = await import("@/helper/follow");
          const followArgs = {
            id: selectedPost?.postedById as string,
            uid: session?.user.uid as string,
            followedByName: session?.user.username as string,
            refreshData,
            ssr: false
          };
          await handleFollow(followArgs);
        }
      },
    },
    {
      id: 3,
      name: "Copy Link",
      event: async () => {
        const { copyLink } = await import("@/util/copyLink");
        copyLink(`${process.env.NEXTAUTH_URL}/post/${selectedPost?.postId}`)
        setMenuModal(false);
      },
    },
    {
      id: 4,
      name: "Go to post",
      event: () => setMenuModal(false),
    },

    {
      id: 5,
      name: "Share to",
      event: async () => {
        const { share } = await import("@/util/share");
        share(selectedPost, `${process.env.NEXTAUTH_URL}/post/${selectedPost?.postId}`);
      },
    },
    {
      id: 6,
      name: "Cancel",
      event: handleCLose,
    },
  ];

  return (
    <Modal isModalOpen={menuModal}>
      <div className="flex h-full flex-col items-center justify-center">
        <ul className="flex min-w-[400px]   flex-col rounded-lg bg-white p-5 text-black dark:bg-black dark:text-white">
          {buttonLists.map((button) => (
            <>
              {selectedPost?.postedById === user?.uid && button.id === 1 ? (
                <Link href={`/post/${selectedPost?.postId}`} key={button.id} className={`rounded-none py-3 text-sm font-semibold transition-all border-b border-gray-500 border-opacity-10  hover:rounded-lg duration-300 ease-out hover:bg-[#a5a5a517] dark:hover:bg-[#a8a8a817] md:py-4 md:text-base ${button.id === 1 || button.id === 2 ? "text-red-600" : ""
                  }`}>
                  {button.name}
                </Link>
              ) : (
                <>
                  {button.id === 4 ? (
                    <Link href={`/post/${selectedPost?.postId}`} onClick={button.event} className={`rounded-none py-3 border-b border-gray-500 border-opacity-10  hover:rounded-lg text-sm font-semibold transition-all duration-300 ease-out hover:bg-[#a5a5a517] dark:hover:bg-[#a8a8a817]  md:py-4 md:text-base `}>
                      {button.name}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      name={button.name}
                      title={button.name}
                      key={button.id}
                      onClick={button.event}
                      className={`rounded-none py-3 text-sm font-semibold transition-all duration-300 ease-out hover:bg-[#a5a5a517] dark:hover:bg-[#a8a8a817] border-b border-gray-500 border-opacity-10  hover:rounded-lg md:py-4 md:text-base ${button.id === 1 || button.id === 2 ? "text-red-600" : ""}`}
                    >
                      {button.name}
                    </button>
                  )}
                </>
              )}
            </>
          ))}
        </ul>
      </div>
    </Modal>
  );
}