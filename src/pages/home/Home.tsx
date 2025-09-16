import React from "react"
import { usePokedex } from "../../context/PokemonContext"
import PokemonCard from "../../component/pokemonCard/PokemonCard"

export default function Home() {
  const { randomPokemons } = usePokedex()

  if (!randomPokemons) return <div>Loading...</div>
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {randomPokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  )
}
