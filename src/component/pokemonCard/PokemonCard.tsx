import TypeBadge from "../typebadge/TypeBadge"
import type { IPokemonLite } from "../../interfaces/IPokemonLite"
import Modal from "../modal/Modal"
import { useState } from "react"

type PokemonCardPros = {
  pokemon: IPokemonLite
}

export default function PokemonCard({ pokemon }: PokemonCardPros) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="card group text-left overflow-hidden transition-transform hover:-translate-y-0.5 p-5 border rounded-md">
        <div className="aspect-square bg-black/20 rounded-md mb-2">
          {pokemon.image && <img src={pokemon.image} alt={pokemon.name} className="w-full h-full object-contain p-4" />}
        </div>
        <div>
          <div className="text-xs text-black/60">#{String(pokemon.id).padStart(4, "0")}</div>
          <div className="text-lg font-semibold capitalize">{pokemon.name}</div>
          <div className="mt-2 flex gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} pokemonId={pokemon.id} />
    </>
  )
}
