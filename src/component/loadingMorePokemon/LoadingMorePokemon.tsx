import React, { useState } from "react"
import { usePokedex } from "../../context/PokemonContext"
import PokemonCard from "../pokemonCard/PokemonCard"

export default function LoadingMorePokemon() {
  const { generationResult } = usePokedex()

  const limit: number = 12

  const [showMorePokemon, setShowMorePokemon] = useState<number>(limit)

  const pokemonShownOnPage = generationResult.slice(0, showMorePokemon)

  const loadMore = () => {
    setShowMorePokemon((pokemons) => pokemons + limit)
  }

  return (
    <div>
      {pokemonShownOnPage.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} onclick={() => {}} />
      ))}
      <button onClick={loadMore} className="border rounded-2xl p-5 bg-blue-300 text-white mt-5">
        Loading more Pokémon
      </button>
    </div>
  )
}
