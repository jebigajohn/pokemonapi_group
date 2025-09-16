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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pokemonShownOnPage.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
      <button onClick={loadMore} className="border rounded-2xl p-5 bg-blue-300 text-white mt-5">
        Loading more Pokémon
      </button>
    </div>
  )
}
