import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"

import "../../public/build/global.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="global-styles">
      <Component {...pageProps} />
    </div>
  )
}

export default trpc.withTRPC(MyApp)
