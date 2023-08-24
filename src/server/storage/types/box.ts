import { BoxStatus } from "../../types/boxStatus"

export type DbBox = {
  id: string
  status: BoxStatus
  itemIds: string[]
  rewardId?: string
}
