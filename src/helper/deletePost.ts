import { storage, db } from "@/config/firebase";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export const deletePost = async (post:DocumentData) => {
  try {
    const postRef = ref(storage, post.storageRef);
    const deleteFromFirestore = await deleteDoc(
      doc(db, 'posts', `post-${post.postId}`)
    );
    const deleteFromStorage = await deleteObject(postRef);
    await Promise.all([deleteFromFirestore, deleteFromStorage]).then(() => {
      window.location.reload();
    });
  } catch (error: any) {
    console.log(error.message);
  }
};