// same origin User type
type User = {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name?: string
  thumbnailURL?: string
  gender?: string
}

export type ApplyCard = {
  id: string
  partyID: string
  groupID: string
  organizerUID: string
  users: User[]
}

export const buildApplyCard = (id: string, data: firebase.firestore.DocumentData) => {
  const newApplyCard: ApplyCard = {
    id,
    partyID: data.partyID,
    groupID: data.groupID,
    organizerUID: data.organizerUID,
    users: data.users
  }

  return newApplyCard
}
