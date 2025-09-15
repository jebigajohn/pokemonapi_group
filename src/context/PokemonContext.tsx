import React, { createContext, useContext, useEffect, useState } from "react"
import type { IPokemonDescription, IPokemonResult } from "../interfaces/IPokemon"
import type { ITypeResult } from "../interfaces/IType"

export type PokedexState = {
  // query
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>

  // Random Pokemon
  randomPokemons: IPokemonDescription[] | null
  setRandomPokemons: React.Dispatch<React.SetStateAction<IPokemonDescription[] | null>>

  // Generations
  generation: number | null
  setGeneration: React.Dispatch<React.SetStateAction<number | null>>
  generationResult: IPokemonResult[]

  // Types
  type: string | null
  setType: React.Dispatch<React.SetStateAction<string | null>>
  typeResult: ITypeResult[]

  // Ergebnisliste
  pokemon: IPokemonResult[]
  loading: boolean
  error: string | null

  // Detail
  selectedPokemon: IPokemonDescription | null
  setSelectedPokemon: React.Dispatch<React.SetStateAction<IPokemonDescription | null>>
  detailLoading: boolean
  detailError: string | null
}

const PokedexContext = createContext<PokedexState | null>(null)

export function usePokedex() {
  const ctx = useContext(PokedexContext)
  if (!ctx) throw new Error("usePokedex must e used within PokedexProvider")
  return ctx
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  // Suchfeld
  const [query, setQuery] = useState("")

  // Random Pokemons
  const [randomPokemons, setRandomPokemons] = useState<IPokemonDescription[] | null>(null)

  // Generations
  const [generation, setGeneration] = useState<number | null>(null)
  const [generationResult, setGenerationResult] = useState<IPokemonResult[]>([])

  // Types
  const [type, setType] = useState<string | null>(null)
  const [typeResult, setTypeResult] = useState<ITypeResult[]>([])

  // Ergebnisliste
  const [pokemon, setPokemon] = useState<IPokemonResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Detail
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemonDescription | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  //# Initial: 12 Random Pokemon
  useEffect(() => {}, [])

  //# Suchfeld
  useEffect(() => {}, [])

  const value: PokedexState = {
    query,
    setQuery,
    randomPokemons,
    setRandomPokemons,
    generation,
    setGeneration,
    generationResult,
    type,
    setType,
    typeResult,
    pokemon,
    loading,
    error,
    selectedPokemon,
    setSelectedPokemon,
    detailLoading,
    detailError,
  }
  return <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>
}
