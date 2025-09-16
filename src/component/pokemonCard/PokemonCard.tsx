import TypeBadge from "../typebadge/TypeBadge"
import type { IPokemonDescription } from "../../interfaces/IPokemon"
import type { IPokemonLite } from "../../interfaces/IPokemonLite"

type PokemonCardPros = {
  pokemon: IPokemonLite
  onclick: () => void
}

export default function PokemonCard({ pokemon, onclick }: PokemonCardPros) {
  return (
    <>
      <button
        onClick={onclick}
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
    </>
  )
}
