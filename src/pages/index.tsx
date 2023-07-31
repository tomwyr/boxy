import { trpc } from "../utils/trpc";

export default function HomePage() {
  const result = trpc.greeting.useQuery({
    name: "Bob",
  });

  if (!result.data) {
    return <div>Loading...</div>;
  }

  return <div>{result.data.message}</div>;
}
