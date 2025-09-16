import React, { createContext, useContext, useEffect, useState } from "react"

import { getPokemon, listByGeneration, listByType, listRandom12 } from "../api/Pokemon"
import type { IPokemonLite } from "../interfaces/IPokemonLite"

export type PokedexState = {
  // query
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>

  // Random Pokemon
  randomPokemons: IPokemonLite[] | null
  setRandomPokemons: React.Dispatch<React.SetStateAction<IPokemonLite[] | null>>

  // Generations
  generation: number | null
  setGeneration: React.Dispatch<React.SetStateAction<number | null>>
  generationResult: IPokemonLite[]

  // Types
  type: string | null
  setType: React.Dispatch<React.SetStateAction<string | null>>
  typeResult: IPokemonLite[]

  // Ergebnisliste
  pokemon: IPokemonLite[]
  loading: boolean
  error: string | null

  // Detail
  selectedPokemon: IPokemonLite | null
  setSelectedPokemon: React.Dispatch<React.SetStateAction<IPokemonLite | null>>
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
  const [randomPokemons, setRandomPokemons] = useState<IPokemonLite[] | null>(null)

  // Generations
  const [generation, setGeneration] = useState<number | null>(null)
  const [generationResult, setGenerationResult] = useState<IPokemonLite[]>([])

  // Types
  const [type, setType] = useState<string | null>(null)
  const [typeResult, setTypeResult] = useState<IPokemonLite[]>([])

  // Ergebnisliste
  const [pokemon, setPokemon] = useState<IPokemonLite | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Detail
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemonLite | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  //  mapLite
  // listRandom12
  // listByGeneration
  // listByType
  // listAllNames
  // getPokemon

  //# Initial: 12 Random Pokemon
  // listRandom12
  useEffect(() => {
    const getRandomPokemon = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await listRandom12()
        setRandomPokemons(resp)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    getRandomPokemon()
  }, [])

  //# Generation
  // listByGeneration
  useEffect(() => {
    setLoading(true)
    setError(null)
    if (generation) {
      const getGeneration = async () => {
        setError(null)
        try {
          const resp = await listByGeneration(generation)
          setGenerationResult(resp)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
      getGeneration()
    }
  }, [generation])

  //# Type
  // listByType
  useEffect(() => {
    setLoading(true)
    setError(null)
    if (type) {
      const getType = async () => {
        setError(null)
        try {
          const resp = await listByType(type)
          setTypeResult(resp)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
      getType()
    }
  }, [type])

  //# Pokemon (einzeln)
  // getPokemon

  const getIndividualPokemon = async (nameOrId: string | number) => {
    setDetailLoading(true)
    setDetailError(null)
    try {
      const resp = await getPokemon(nameOrId)
      setSelectedPokemon(resp)
    } catch (error: any) {
      setDetailError(error.message)
    } finally {
      setDetailLoading(false)
    }
  }

  //# Suchfeld
  // getPokemon
  // listAllNames
  useEffect(() => {
    setLoading(true)
    setError(null)
    if (query) {
      const getSearchedPokemon = async () => {
        setError(null)
        try {
          const resp = await getPokemon(query)
          setPokemon(resp)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
      getSearchedPokemon()
    }
  }, [query])

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
    setLoading,
    error,
    selectedPokemon,
    setSelectedPokemon,
    detailLoading,
    detailError,
  }
  return <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>
}
