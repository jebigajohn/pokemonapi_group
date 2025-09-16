/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

import type { IPokemonLite } from "../interfaces/IPokemonLite"

import type { IPokemonDescription } from "../interfaces/IPokemon"

const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" })

const mapLite = (d: any): IPokemonLite => ({
  id: d.id,
  name: d.name,
  image: d.sprites?.other?.["official-artwork"]?.front_default ?? d.sprites?.front_default ?? null,
  types: d.types?.map((t: any) => t.type.name) ?? [],
})

export async function listRandom12(): Promise<IPokemonLite[]> {
  const maxPokemon = 1025
  const picks = new Set<number>()
  while (picks.size < 12) picks.add(1 + Math.floor(Math.random() * maxPokemon))
  const requests = [...picks].map((id) => api.get(`/pokemon/${id}`))
  const responses = await Promise.all(requests)
  return responses.map((r) => mapLite(r.data))
}

export async function listByGeneration(gen: number): Promise<IPokemonLite[]> {
  const { data } = await api.get(`/generation/${gen}`)
  const speciesID: number[] = (data.pokemon_species ?? [])
    .map((s: { url: string }) => {
      const speciesParts = s.url.split("/").filter(Boolean)
      return Number(speciesParts[speciesParts.length - 1])
    })
    .filter(Boolean)
    .sort((a: any, b: any) => a - b)
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
  const { data } = await api.get("/pokemon", { params: { limit: 1025, offset: 0 } })
  return (data.results ?? []).map((r: { name: string }) => r.name)
}

export async function getPokemon(nameOrId: string | number): Promise<IPokemonDescription | null> {
  try {
    const { data } = await api.get(`/pokemon/${nameOrId}`)
    return data as IPokemonDescription
  } catch {
    return null
  }
}
