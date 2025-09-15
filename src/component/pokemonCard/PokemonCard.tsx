import TypeBadge from "../typebadge/TypeBadge"
import type { IPokemonDescription } from "../../interfaces/IPokemon"

type PokemonCardPros = {
  pokemon: IPokemonDescription
  onclick: () => void
}

export default function PokemonCard({ pokemon, onclick }: PokemonCardPros) {
  return (
    <>
      <button
        onClick={onclick}
        className="card group text-left overflow-hidden transition-transform hover:-translate-y-0.5 p-5 border rounded-md">
        <div className="aspect-square bg-black/20 rounded-md mb-2">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-full h-full object-contain p-4" />
        </div>
        <div>
          <div className="text-xs text-black/60">#{String(pokemon.id).padStart(4, "0")}</div>
          <div className="text-lg font-semibold capitalize">{pokemon.name}</div>
          <div className="mt-2 flex gap-2">
            {pokemon.past_types.map((type) => (
              <TypeBadge key={type.slot} type={type.type.name} />
            ))}
          </div>
        </div>
      </button>
    </>
  )
}
