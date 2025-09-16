import { usePokedex } from "../../context/PokemonContext"
import TypeBadge from "../typebadge/TypeBadge"
import CryButton from "../cryButton/CryButton"
import { useMemo } from "react"

type ModalProps = {
  open: boolean
  onClose: () => void
}

const STAT_LABEL: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
}

function statPercent(v: number) {
  const max = 255
  const p = Math.max(0, Math.min(v, max))
  return Math.round((p / max) * 100)
}

export default function Modal({ open, onClose }: ModalProps) {
  const { selectedPokemon, detailLoading, detailError } = usePokedex()

  const abilities = useMemo(() => {
    if (!selectedPokemon) return []
    return selectedPokemon.abilities.map((ability) => ({
      name: ability.ability?.name,
      hidden: ability.is_hidden,
    }))
  }, [selectedPokemon])

  const stats = useMemo(() => {
    if (!selectedPokemon) return []
    return selectedPokemon.stats.map((s) => ({
      key: s.stat.name,
      label: STAT_LABEL[s.stat.name] ?? s.stat.name,
      value: s.base_stat,
    }))
  }, [selectedPokemon])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 lg:bg-black/60 lg:backdrop-blur-sm p-10" onClick={onClose} />

      <div className="relative card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-black/10 shadow-2xl bg-white scrollbar-none">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 flex items-center justify-center">
            {detailLoading ? (
              <div>Load...</div>
            ) : selectedPokemon ? (
              <img
                src={
                  selectedPokemon.sprites.other?.showdown.front_default ??
                  selectedPokemon.sprites.other?.["official-artwork"].front_default
                }
                alt={selectedPokemon.name}
                className="w-full h-auto object-contain bg-black/4 p-5 rounded-2xl"
              />
            ) : (
              <div>No Data</div>
            )}
          </div>
          <div className="md:w-1/2 p-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-bold capitalize">
                {selectedPokemon?.name ?? (detailLoading ? "Load..." : "—")}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full px-2 py-1 text-sm hover:bg-black/10 flex items-center justify-center">
                ✕
              </button>
            </div>

            {detailError && <div className="mt-2 text-sm text-red-600">{detailError}</div>}

            {selectedPokemon && (
              <>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {selectedPokemon.types.map((type, index) => (
                    <TypeBadge key={index} type={type.type.name} />
                  ))}
                </div>

                <ul className="mt-4 text-sm grid grid-cols-2 gap-y-1">
                  <li>
                    <span className="text-gray-500">ID:</span> {selectedPokemon.id}
                  </li>
                  <li>
                    <span className="text-gray-500">Base XP:</span> {selectedPokemon.base_experience}
                  </li>
                  <li>
                    <span className="text-gray-500">Höhe:</span> {selectedPokemon.height}
                  </li>
                  <li>
                    <span className="text-gray-500">Gewicht:</span> {selectedPokemon.weight}
                  </li>
                </ul>
                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Abilities</h3>
                  {abilities.length ? (
                    <div className="flex flex-wrap gap-2">
                      {abilities.map((a) => (
                        <span
                          key={a.name}
                          className="px-3 py-1 rounded-full text-xs bg-bgbtn border border-black/10 capitalize"
                          title={a.hidden ? "Hidden Ability" : "Ability"}>
                          {a.name}
                          {a.hidden && <span className="ml-1 opacity-70">(hidden)</span>}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">—</div>
                  )}
                </section>

                <section className="mt-5 w-[90%]">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Base Stats</h3>
                  <div className="space-y-2">
                    {stats.map((stat) => (
                      <div key={stat.key}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium">{stat.label}</span>
                          <span className="tabular-nums">{stat.value}</span>
                        </div>
                        <div className="h-2 rounded bg-gray-200 overflow-hidden">
                          <div className="h-full bg-black/70" style={{ width: `${statPercent(stat.value)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="mt-4">
                  <CryButton pokemon={selectedPokemon} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
