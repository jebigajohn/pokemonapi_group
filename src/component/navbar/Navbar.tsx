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
    <nav className="flex justify-between items-center py-10 gap-30 px-20">
      <div className="flex items-center">
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={[
                "flex items-center border border-brd rounded-2xl px-4 py-3 text-xs bg-bgbtn",
                isActive ? "bg-btnClicked text-bgbtn" : "hover:bg-btnHover",
              ].join(" ")}>
              Home
            </div>
          )}
        </NavLink>
      </div>
      <div className="flex flex-wrap gap-4">
        {Gens.map((gen) => (
          <NavLink key={gen.id} to={`/gen/${gen.id}`}>
            {({ isActive }) => (
              <div
                className={[
                  "flex items-center gap-2 border border-brd rounded-2xl px-3 py-2 text-xs bg-bgbtn",
                  isActive ? "bg-btnClicked text-bgbtn" : "hover:bg-btnHover",
                ].join(" ")}>
                <img src={`/pokeball/${gen.id}-removebg-preview.png`} alt="Pokeball" className="w-5 h-5" />
                {gen.label}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
