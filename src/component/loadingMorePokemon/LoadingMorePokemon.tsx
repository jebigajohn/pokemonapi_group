import { useState } from "react"
import { usePokedex } from "../../context/PokemonContext"
import PokemonCard from "../pokemonCard/PokemonCard"

export default function LoadingMorePokemon() {
  const { generationResult } = usePokedex()

  const numberOfPokemon: number = 12

  const [showMorePokemon, setShowMorePokemon] = useState<number>(numberOfPokemon)

  const pokemonShownOnPage = generationResult.slice(0, showMorePokemon)

  const loadMore = () => {
    setShowMorePokemon((pokemons) => pokemons + numberOfPokemon)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {pokemonShownOnPage.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <button
        onClick={loadMore}
        className="flex items-center justify-center border border-brd rounded-2xl px-3 py-2 m-10 text-sm bg-bgbtn hover:bg-btnHover hover:scale-120 cursor-pointer">
        Loading more Pokémon
      </button>
    </div>
  )
}
