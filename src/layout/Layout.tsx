import { Outlet } from "react-router"
import Header from "../component/header/Header"

export default function Layout() {
  return (
    <>
      <div>
        <Header />
        <main className="px-1">
          <Outlet />
        </main>
      </div>
    </>
  )
}
