/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

import type { IPokemonLite } from '../interfaces/IPokemonLite'

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' })

const mapLite = (d: any): IPokemonLite => ({
  id: d.id,
  name: d.name,
  image:
    d.sprites?.other?.['official-artwork']?.front_default ??
    d.sprites?.front_default ??
    null,
  types: d.types?.map((t: any) => t.type.name) ?? [],
})

export async function listRandom12(): Promise<IPokemonLite[]> {
  const { data: first } = await api.get('/pokemon', { params: { limit: 1 } })
  const count: number = first.count

  const picks = new Set<number>()
  while (picks.size < 12) picks.add(1 + Math.floor(Math.random() * count))

  const requests = [...picks].map((id) => api.get(`/pokemon/${id}`))
  const responses = await Promise.all(requests)

  return responses.map((r) => mapLite(r.data))
}

const POKEDEX_BY_GEN: Record<number, string> = {
  1: 'kanto',
  2: 'johto',
  3: 'hoenn',
  4: 'sinnoh',
  5: 'unova',
  6: 'kalos',
  7: 'alola',
  8: 'galar',
  9: 'paldea',
}

export async function listByGeneration(gen: number): Promise<IPokemonLite[]> {
  const dex = POKEDEX_BY_GEN[gen]
  const { data } = await api.get(`/pokedex/${dex}`)

  const speciesNames: string[] = (data.pokemon_entries ?? [])
    .map((e: any) => e.pokemon_species?.name)
    .filter(Boolean)

  const requests = speciesNames
    .slice(0, 50)
    .map((name) => api.get(`/pokemon/${name}`))
  const responses = await Promise.all(requests)

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
  const { data: first } = await api.get('/pokemon', { params: { limit: 1 } })
  const count: number = first.count

  const { data } = await api.get('/pokemon', { params: { limit: count } })
  return (data.results ?? []).map((r: any) => r.name)
}

export async function getPokemon(
  nameOrId: string | number
): Promise<IPokemonLite | null> {
  try {
    const { data } = await api.get(`/pokemon/${nameOrId}`)
    return mapLite(data)
  } catch {
    return null
  }
}
