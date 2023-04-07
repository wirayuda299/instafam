import { doc, getDoc, arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
type FollowerProps = Pick<IUser, 'followers'>


export async function handleFollow(id: string = '', uid: string = '', followedByName: string = '', refreshData: () => void): Promise<void> {
  if(typeof window === 'undefined') return;
  try {

    const userRef = doc(db, 'users', id);
    const currentUserRef = doc(db, 'users', `${uid}`);

    const [getUsers] = await Promise.all([getDoc(userRef), getDoc(currentUserRef)]);

    if (getUsers) {
      const res = getUsers.data();
      const hasFollow: boolean = res?.followers.some((follower: FollowerProps['followers'][0]) => follower.followedBy === uid);
      const updateAuthorFollowersLists = hasFollow
        ? {
          followers: arrayRemove({
            followedBy: uid,
            followedByName: followedByName
          })
        }
        : {
          followers: arrayUnion({
            followedBy: uid,
            followedByName: followedByName
          })
        };

      const updateCurrentUserFollowingLists = hasFollow ? {
        following: arrayRemove({ userId: id })
      }
        : { following: arrayUnion({ userId: id }) };

      await Promise.all([
        updateDoc(userRef, updateAuthorFollowersLists),
        updateDoc(currentUserRef, updateCurrentUserFollowingLists)
      ]).then(() => {
        refreshData();
      })
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
