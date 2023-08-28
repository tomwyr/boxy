import { BoxStatus } from "../../server/types/boxStatus"

export const BoxStatusProps = (boxStatus: BoxStatus) => {
  return {
    get name(): string {
      switch (boxStatus) {
        case "closed":
          return "Closed"
        case "open":
          return "Open"
      }
    },
  }
}
