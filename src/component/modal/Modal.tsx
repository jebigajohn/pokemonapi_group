import { useEffect, useState } from "react"
import { usePokedex } from "../../context/PokemonContext"
import TypeBadge from "../typebadge/TypeBadge"
import CryButton from "../cryButton/CryButton"
import type { IPokemonDescription, Species } from "../../interfaces/IPokemon"

type PokemonWithTypes = IPokemonDescription & {
  types: Array<{ slot: number; type: Species }>
}

type ModalProps = {
  open: boolean
  onClose: () => void
  pokemonId: number | null
}

export default function Modal({ open, onClose, pokemonId }: ModalProps) {
  const { selectedPokemon, setSelectedPokemon } = usePokedex()

  const [pokemon, setPokemon] = useState<PokemonWithTypes | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useGif, setUseGif] = useState(true)

  useEffect(() => {
    if (!open) setUseGif(true)
  }, [open])

  if (!open) return null

  const idNum = pokemon ? String(pokemon.id).padStart(4, "0") : "—"
  const gifUrl = pokemon?.sprites.animated?.front_default ?? null
  const staticUrl = pokemon?.sprites.front_default ?? pokemon?.sprites.animated?.front_default ?? ""

  const imgSrc = useGif ? gifUrl ?? staticUrl : staticUrl

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative card max-w-2xl w-full overflow-hidden rounded-md border">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-black/30 grid place-items-center p-4 min-h-[300px]">
            {loading && <p className="text-white/70">Loading Pokémon…</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!loading && !error && pokemon && (
              <img src={imgSrc} alt={pokemon.name} className="w-full h-full object-contain max-h-[360px]" />
            )}
          </div>
          <div className="md:w-1/2 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-white/60">#{idNum}</div>
                <h2 className="text-2xl font-bold capitalize">{pokemon?.name ?? "…"}</h2>
              </div>
              <button onClick={onClose} className="rounded-full px-2 py-1 text-sm hover:bg-white/10">
                ✕
              </button>
            </div>

            <div className="mt-3 flex gap-2 flex-wrap">
              {pokemon?.types?.map((type) => (
                <TypeBadge key={type.slot} type={type.type.name} />
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <CryButton pokemon={pokemon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
