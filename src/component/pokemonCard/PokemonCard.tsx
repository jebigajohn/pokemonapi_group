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
        className="text-left overflow-hidden w-full max-w-xs transition-transform hover:-translate-y-0.5 p-5 border border-black/5 shadow-xl rounded-2xl">
        <div className="aspect-square bg-black/20 rounded-2xl mb-2">
          {image && <img src={image} alt={pokemon.name} className="object-contain p-4" />}
        </div>
        <div>
          <div className="text-xs text-black/40">#{String(pokemon.id).padStart(4, "0")}</div>
          <div className="text-lg font-semibold capitalize">{pokemon.name}</div>
          <div className="mt-2 flex flex-col sm:flex-row gap-2">
            {types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
