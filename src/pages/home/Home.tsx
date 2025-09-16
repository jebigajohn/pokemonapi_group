import { usePokedex } from "../../context/PokemonContext"
import PokemonCard from "../../component/pokemonCard/PokemonCard"
import { useState } from "react"
import { listRandom12 } from "../../api/Pokemon"

export default function Home() {
  const { randomPokemons, setRandomPokemons, setQuery, pokemon, loading, error } = usePokedex()

  const [search, setSearch] = useState("")

  const handleSearch = () => {
    if (search.trim() === "") return
    setQuery(search.trim().toLowerCase())
  }

  const handleReloadRandom = async () => {
    const resp = await listRandom12()
    setRandomPokemons(resp)
  }

  if (!randomPokemons) return <div>Loading...</div>
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon by name or ID..."
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button onClick={handleSearch} className="px-4 py-2">
          Search
        </button>
        <button onClick={handleReloadRandom} className="px-4 py-2">
          New Random
        </button>
      </div>
      {loading && <div>Loading…</div>}
      {error && <div className="text-red-500">{error}</div>}
      {pokemon ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Search Result:</h2>
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        </div>
      ) : null}
      <h2 className="text-xl font-semibold mb-2">Random Pokémon</h2>
      {!randomPokemons ? (
        <div>Loading random Pokémon…</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
          {randomPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}
