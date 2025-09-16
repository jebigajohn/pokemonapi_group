/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

import type { IPokemonLite } from "../interfaces/IPokemonLite"
import { useEffect } from "react"
import type { IPokemonDescription } from "../interfaces/IPokemon"

const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" })

const mapLite = (d: any): IPokemonLite => ({
  id: d.id,
  name: d.name,
  image: d.sprites?.other?.["official-artwork"]?.front_default ?? d.sprites?.front_default ?? null,
  types: d.types?.map((t: any) => t.type.name) ?? [],
})

export async function listRandom12(): Promise<IPokemonLite[]> {
  // const { data: first } = await api.get("/pokemon", { params: { limit: 1 } })
  const maxPokemon = 1025

  const picks = new Set<number>()
  while (picks.size < 12) picks.add(1 + Math.floor(Math.random() * maxPokemon))

  const requests = [...picks].map((id) => api.get(`/pokemon/${id}`))
  const responses = await Promise.all(requests)

  return responses.map((r) => mapLite(r.data))
}

// export async function listRandom12(): Promise<IPokemonLite[]> {
//   const { data: first } = await api.get('/pokemon', { params: { limit: 1 } })
//   const count: number = first.count

//   const { data } = await api.get('/pokemon', {
//     params: { limit: count, offset: 0 },
//   })
//   const names: string[] = (data.results ?? []).map((r: any) => r.name)

//   const picks = new Set<string>()
//   while (picks.size < 12 && picks.size < names.length) {
//     const idx = Math.floor(Math.random() * names.length)
//     picks.add(names[idx])
//   }
// #listByGeneration
export async function listByGeneration(gen: number): Promise<IPokemonLite[]> {
  // const dex = POKEDEX_BY_GEN[gen]
  const { data } = await api.get(`/generation/${gen}`)

  const speciesID: number[] = (data.pokemon_species ?? [])
    .map((s: { url: string }) => {
      const speciesParts = s.url.split("/").filter(Boolean)
      return Number(speciesParts[speciesParts.length - 1])
    })
    .filter(Boolean)
    .sort((a, b) => a - b)

  const requests = speciesID.slice(0, 20)
  const responses = await Promise.all(requests.map((id) => api.get(`/pokemon/${id}`)))

  return responses.map((r) => mapLite(r.data))
}

export async function listByType(typeName: string): Promise<IPokemonLite[]> {
  const { data } = await api.get(`/type/${typeName}`)
  const names: string[] = (data.pokemon ?? []).map((x: any) => x.pokemon.name)

  const requests = names.slice(0, 50).map((n) => api.get(`/pokemon/${n}`))
  const responses = await Promise.all(requests)

  return responses.map((r) => mapLite(r.data))
}

export async function listAllNames(): Promise<string[]> {
  const { data: first } = await api.get("/pokemon", { params: { limit: 1 } })
  const count: number = first.count

  const { data } = await api.get("/pokemon", { params: { limit: count } })
  return (data.results ?? []).map((r: any) => r.name)
}

export async function getPokemon(nameOrId: string | number): Promise<IPokemonDescription | null> {
  try {
    const { data } = await api.get(`/pokemon/${nameOrId}`)
    return data as IPokemonDescription
  } catch {
    return null
  }
}
