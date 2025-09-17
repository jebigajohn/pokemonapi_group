import { usePokedex } from "../../context/PokemonContext"
import PokemonCard from "../../component/pokemonCard/PokemonCard"
import { useEffect, useState } from "react"
import { listRandom12 } from "../../api/Pokemon"

export default function Home() {
  const { randomPokemons, setRandomPokemons, setQuery, pokemon, setPokemon, loading, error } = usePokedex()

  const [search, setSearch] = useState("")

  const handleSearch = () => {
    setSearch("")
    if (search.trim() === "") return
    setQuery(search.trim().toLowerCase())
  }

  const handleClear = async () => {
    setPokemon(null)
    setQuery("")
  }

  const handleReloadRandom = async () => {
    const resp = await listRandom12()
    setRandomPokemons(resp)
    setPokemon(null)
  }

  const placeholder = window.innerWidth < 768 ? "Search Pokemon..." : "Search Pokémon by name or ID..."

  if (!randomPokemons) return <div>Loading...</div>
  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full sm:max-w-md flex items-center border border-brd rounded-2xl px-3 py-3 text-sm bg-bgbtn"
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
        <div className="mb-6 flex flex-col items-center justify-center p-20">
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
          <button
            className="text-center text-xl mt-5 p-2 px-3 border border-brd rounded-full bg-bgbtn hover:bg-btnHover hover:scale-120 cursor-pointer"
            onClick={handleClear}>
            x
          </button>
        </div>
      ) : null}
      <h2 className="text-xl font-semibold mb-5 ">Random Pokémon</h2>
      {!randomPokemons ? (
        <div>Loading random Pokémon…</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
          {randomPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}
