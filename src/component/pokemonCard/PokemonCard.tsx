import TypeBadge from "../typebadge/TypeBadge"
import Modal from "../modal/Modal"
import { useState } from "react"
import { usePokedex } from "../../context/PokemonContext"
import type { IPokemonDescription } from "../../interfaces/IPokemon"
import type { IPokemonLite } from "../../interfaces/IPokemonLite"

type PokemonCardProps = {
  pokemon: IPokemonDescription | IPokemonLite
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [open, setOpen] = useState(false)
  const { setSelectedPokemonId } = usePokedex()

  const openModal = () => {
    setSelectedPokemonId(pokemon.id)
    setOpen(true)
  }

  const isDescription = (p: IPokemonDescription | IPokemonLite): p is IPokemonDescription => {
    return (p as IPokemonDescription).sprites !== undefined
  }

  const image = isDescription(pokemon)
    ? pokemon.sprites.other?.["official-artwork"]?.front_default ?? pokemon.sprites.front_default ?? null
    : pokemon.image

  const types = isDescription(pokemon) ? pokemon.types.map((t) => t.type.name) : pokemon.types

  return (
    <>
      <button
        onClick={openModal}
        className="card group text-left overflow-hidden transition-transform hover:-translate-y-0.5 p-5 border rounded-md">
        <div className="aspect-square bg-black/20 rounded-md mb-2">
          {image && <img src={image} alt={pokemon.name} className="w-full h-full object-contain p-4" />}
        </div>
        <div>
          <div className="text-xs text-black/60">#{String(pokemon.id).padStart(4, "0")}</div>
          <div className="text-lg font-semibold capitalize">{pokemon.name}</div>
          <div className="mt-2 flex gap-2">
            {types.map((t) => (
              <TypeBadge key={t} type={t} />
            ))}
          </div>
        </div>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
