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
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon by name or ID..."
          className="min-w-100 flex items-center border border-brd rounded-2xl px-3 py-3 text-sm bg-bgbtn"
        />
        <button
          onClick={handleSearch}
          className="flex items-center justify-center border border-brd rounded-2xl px-3 py-2 text-sm bg-bgbtn hover:bg-btnHover hover:scale-120 cursor-pointer">
          Search
        </button>
        <button
          onClick={handleReloadRandom}
          className="flex items-center justify-center gap-2 border border-brd rounded-2xl px-3 py-2 text-sm bg-bgbtn hover:bg-btnHover hover:scale-120 cursor-pointer">
          New Random
        </button>
      </div>
      {loading && <div>Loading…</div>}
      {error && <div className="text-red-500">{error}</div>}
      {pokemon ? (
        <div className="mb-6 flex items-center justify-center p-20">
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        </div>
      ) : null}
      <h2 className="text-xl font-semibold mb-5 ">Random Pokémon</h2>
      {!randomPokemons ? (
        <div>Loading random Pokémon…</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
          {randomPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}
