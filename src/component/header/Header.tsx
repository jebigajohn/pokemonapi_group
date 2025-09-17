import { useLocation } from "react-router"
import Navbar from "../navbar/Navbar"

export default function Header() {
  const location = useLocation()

  const getPageTitle = (pathname: string) => {
    if (pathname === "/") return "Home"
    if (pathname.startsWith("/gen/")) return `Generation ${pathname.split("/")[2]}`
    return "Seite"
  }

  const subtitle = getPageTitle(location.pathname)
  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <Navbar />
      <div className="text-center">
        <h1 className="mt-7 text-7xl xl:text-9xl font-solid font-bold text-outline tracking-wider">Pokedex</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  )
}
