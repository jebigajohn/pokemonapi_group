import { NavLink } from "react-router"

const Gens = [
  { id: 1, label: "Gen I" },
  { id: 2, label: "Gen II" },
  { id: 3, label: "Gen III" },
  { id: 4, label: "Gen IV" },
  { id: 5, label: "Gen V" },
  { id: 6, label: "Gen VI" },
  { id: 7, label: "Gen VII" },
  { id: 8, label: "Gen VIII" },
  { id: 9, label: "Gen IX" },
]

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between px-21 py-10">
        <div>
          <NavLink to={"/"}>Home</NavLink>
        </div>
        <div>
          {Gens.map((gen) => {
            return (
              <NavLink
                key={gen.id}
                to={`/gen/${gen.id}`}
                className={({ isActive }) =>
                  ["px-3 py-1.5 text-sm", isActive ? "border-b text-black" : "hover:bg-white/10"].join(" ")
                }>
                {gen.label}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}
