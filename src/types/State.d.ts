import { IUserPostProps } from "./post"
import { IUser } from "./user"
export type State = {
  selectedPost: IUserPostProps | null
  isExtraListOpen: boolean
  isSearchDrawerOpen: boolean
  result: IUser[]
  menuModal: boolean
  postPreviewModal: boolean
  resultDrawer: boolean
  feedModal: boolean
  postModal: boolean
  postCommentModal: boolean
  notificationDrawer: boolean
  notificationModal: boolean
  postCreateModal: boolean
  postReportModal: boolean
  blurhash: string
  previewUrl: string
  croppedImage: string
  receiverDrawer: boolean
  messageModal: boolean
  chatRoomSelected: IUser | null
}