import Spinner from "../icons/spinner"
import { PageLayout } from "./layout"

export default function PageLoading() {
  return (
    <PageLayout>
      <div className="flex justify-center">
        <Spinner />
      </div>
    </PageLayout>
  )
}
