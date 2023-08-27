import { trpc } from "../../utils/trpc"

export default function BoxesPage() {
  const result = trpc.getBoxes.useQuery()

  if (!result.data) {
    return "Loading..."
  }

  return (
    <ul className="list-none">
      {result.data.map((box) => (
        <li className="p-2" key={box.id}>
          <span>{box.items.length} item(s)</span>
          <div className="my-1"></div>
          <span>{box.status}</span>
        </li>
      ))}
    </ul>
  )
}
