import TypeBadge from "../typebadge/TypeBadge"
import Modal from "../modal/Modal"
import { useState } from "react"
import { usePokedex } from "../../context/PokemonContext"
import type { IPokemonDescription } from "../../interfaces/IPokemon"
import type { IPokemonLite } from "../../interfaces/IPokemonLite"
import HoloCard from "../holocard/HoloCard"

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

  const isDescription = (pokemon: IPokemonDescription | IPokemonLite): pokemon is IPokemonDescription => {
    return (pokemon as IPokemonDescription).sprites !== undefined
  }

  const image = isDescription(pokemon)
    ? pokemon.sprites.other?.["official-artwork"]?.front_default ?? pokemon.sprites.front_default ?? null
    : pokemon.image

  const types = isDescription(pokemon) ? pokemon.types.map((t) => t.type.name) : pokemon.types

  return (
    <>
      <HoloCard as="button" onClick={openModal} className="w-full">
        <div className="aspect-square bg-black/20 rounded-2xl mb-2 grid place-items-center">
          {image && <img src={image} alt={pokemon.name} className="w-full h-full object-contain p-4" loading="lazy" />}
        </div>

        <div>
          <div className="text-xs text-black/40">#{String(pokemon.id).padStart(4, "0")}</div>
          <div className="text-lg font-semibold capitalize">{pokemon.name}</div>
          <div className="mt-2 flex flex-col sm:flex-row gap-1">
            {types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </HoloCard>

      <Modal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
