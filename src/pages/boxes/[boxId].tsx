import { useRouter } from "next/router"
import { trpc } from "../../utils/trpc"

export default function Box() {
  const router = useRouter()
  const boxId = router.query.boxId as string

  const result = trpc.getBox.useQuery(boxId)

  if (!result.data) {
    return "Loading..."
  }

  const box = result.data

  return (
    <h1 className="text-4xl">
      Box {box.id} {box.items.length}
    </h1>
  )
}
