import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { onSnapshot, doc } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
type IComment = Pick<IUserPostProps, "comments">;

export default function usePost(post: IUserPostProps) {
  const [likesCount, setLikesCount] = useState<string[]>([]);
  const [comment, setComment] = useState<IComment["comments"]>([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "posts", `post-${post.postId}`), (doc) => {
      if (doc.exists()) {
        setLikesCount(doc.data().likedBy);
        setComment(post.comments);
      }
    });
    return () => unsub();
  }, [db]);

  const likes = useMemo(() => {
    return likesCount;
  }, [likesCount]);

  const comments = useMemo(() => {
    return comment;
  }, [comment]);
  return { likes, comments };
}
