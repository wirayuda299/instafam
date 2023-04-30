import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
import type { Session } from "next-auth";

export async function startNewMessage(session:Session | null, chatRoomSelected:IUser | null) {
  try {
    if(!session ) return 

    const { addDoc, collection }  = await import("firebase/firestore")
    await addDoc(collection(db, "messages"), {
      room: {
        id: [session?.user.uid, chatRoomSelected?.uid],
        receiver: {
          id: chatRoomSelected?.uid,
          image: chatRoomSelected?.image,
          name: chatRoomSelected?.username,
        },
        sender: {
          id: session?.user.uid,
          image: session?.user.image,
          name: session?.user.username,
        },
        chats: [],
      },
    })
  } catch (error: any) {
    console.log(error.message);
  }
  
}