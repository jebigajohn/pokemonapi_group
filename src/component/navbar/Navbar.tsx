import { useEffect, useRef, useState } from "react"
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
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [open])

  const linkBase = "flex items-center gap-2 border border-brd rounded-2xl px-3 py-2 text-xs bg-bgbtn transition-colors"

  return (
    <header className="relative">
      <nav className="flex justify-between items-center py-6 px-10 w-[100vw]">
        <NavLink to="/" onClick={() => setOpen(false)}>
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

        <div className="hidden sm:flex flex-wrap gap-4">
          {Gens.map((gen) => (
            <NavLink key={gen.id} to={`/gen/${gen.id}`}>
              {({ isActive }) => (
                <div className={[linkBase, isActive ? "bg-btnClicked text-bgbtn" : "hover:bg-btnHover"].join(" ")}>
                  <img src={`/pokeball/${gen.id}-removebg-preview.png`} alt="" className="w-5 h-5" />
                  {gen.label}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden relative h-10 w-10 grid place-items-center rounded-md">
          <span
            className={[
              "block absolute h-0.5 w-5 rounded transition-transform duration-200",
              "bg-current",
              open ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0",
            ].join(" ")}
          />
          <span
            className={[
              "block absolute h-0.5 w-5 rounded transition-opacity duration-200",
              "bg-current",
              open ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <span
            className={[
              "block absolute h-0.5 w-5 rounded transition-transform duration-200",
              "bg-current",
              open ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0",
            ].join(" ")}
          />
        </button>
      </nav>
      <div
        className={[
          "sm:hidden fixed inset-0 z-40 transition-opacity",
          open ? "opacity-100 pointer-events-auto bg-black/30" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      <div
        ref={panelRef}
        className={[
          "sm:hidden fixed z-50 top-0 right-0 h-full w-72 max-w-[85vw]",
          "bg-white border-l border-brd shadow-xl",
          "transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}>
        <div className="p-4 flex items-center justify-between border-b border-brd">
          <span className="text-sm font-medium">Generationen</span>
          <button className="h-8 w-8 grid place-items-center rounded-md" onClick={() => setOpen(false)}>
            <div className="relative cursor-pointer">X</div>
          </button>
        </div>

        <div className="p-4 grid gap-3">
          {Gens.map((gen) => (
            <NavLink key={gen.id} to={`/gen/${gen.id}`} onClick={() => setOpen(false)}>
              {({ isActive }) => (
                <div
                  className={[
                    "flex items-center gap-2 border border-brd rounded-2xl px-3 py-2 text-xs bg-bgbtn",
                    isActive ? "bg-btnClicked text-bgbtn" : "hover:bg-btnHover",
                  ].join(" ")}>
                  <img src={`/pokeball/${gen.id}-removebg-preview.png`} alt="" className="w-5 h-5" />
                  {gen.label}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

// export default function Navbar() {
//   return (
//     <nav className="flex justify-between items-center py-10 gap-30 px-20">
//       <div className="flex items-center">
//         <NavLink to="/">{({ isActive }) => <div>Home</div>}</NavLink>
//       </div>
//       <div className="flex flex-wrap gap-4">
//         {Gens.map((gen) => (
//           <NavLink key={gen.id} to={`/gen/${gen.id}`}>
//             {({ isActive }) => (
//               <div>
//                 <img src={`/pokeball/${gen.id}-removebg-preview.png`} alt="Pokeball" className="w-5 h-5" />
//                 {gen.label}
//               </div>
//             )}
//           </NavLink>
//         ))}
//       </div>
//     </nav>
//   )
// }
