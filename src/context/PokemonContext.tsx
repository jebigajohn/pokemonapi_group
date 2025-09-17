import React, { createContext, useContext, useEffect, useState } from "react"
import { getPokemon, listByGeneration, listByType, listRandom12 } from "../api/Pokemon"
import type { IPokemonLite } from "../interfaces/IPokemonLite"
import type { IPokemonDescription } from "../interfaces/IPokemon"

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
  pokemon: IPokemonDescription | null
  setPokemon: React.Dispatch<React.SetStateAction<IPokemonDescription | null>>
  loading: boolean
  error: string | null
  selectedPokemonId: number | null
  setSelectedPokemonId: React.Dispatch<React.SetStateAction<number | null>>

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
  const [randomPokemons, setRandomPokemons] = useState<IPokemonLite[] | null>(null)

  // Generations
  const [generation, setGeneration] = useState<number | null>(null)
  const [generationResult, setGenerationResult] = useState<IPokemonLite[]>([])

  // Types
  const [type, setType] = useState<string | null>(null)
  const [typeResult, setTypeResult] = useState<IPokemonLite[]>([])

  // Ergebnisliste
  const [pokemon, setPokemon] = useState<IPokemonDescription | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null)

  // Detail
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemonDescription | null>(null)
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
    if (!generation) return
    const getGeneration = async () => {
      setLoading(true)
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
  }, [generation])

  //# Type
  // listByType
  useEffect(() => {
    if (!type) return
    const getType = async () => {
      setLoading(true)
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
  }, [type])

  //# Pokemon (einzeln)
  // getPokemon
  useEffect(() => {
    if (!selectedPokemonId) {
      setSelectedPokemon(null)
      return
    }
    const getIndividualPokemon = async () => {
      setDetailLoading(true)
      setDetailError(null)
      try {
        const detail = await getPokemon(selectedPokemonId)
        setSelectedPokemon(detail)
      } catch (error: any) {
        setDetailError(error.message)
      } finally {
        setDetailLoading(false)
      }
    }

    getIndividualPokemon()
  }, [selectedPokemonId])

  //# Suchfeld
  // getPokemon
  // listAllNames
  useEffect(() => {
    if (!query) return
    const getSearchedPokemon = async () => {
      setLoading(true)
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
    error,
    selectedPokemon,
    setSelectedPokemon,
    detailLoading,
    detailError,
    selectedPokemonId,
    setSelectedPokemonId,
    setPokemon,
  }
  return <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>
}
