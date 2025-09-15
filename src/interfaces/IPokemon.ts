export interface IPokemonList {
  count: number
  next: string
  previous: null
  results: IPokemonResult[]
}

export interface IPokemonResult {
  name: string
  url: string
}

export interface IPokemonDescription {
  abilities: Ability[]
  base_experience: number
  cries: Cries
  forms: Species[]
  game_indices: GameIndex[]
  height: number
  held_items: any[]
  id: number
  is_default: boolean
  location_area_encounters: string
  name: string
  order: number
  past_types: any[]
  species: Species
  sprites: Sprites
  weight: number
}

export interface Ability {
  ability: Species | null
  is_hidden: boolean
  slot: number
}

export interface Species {
  name: string
  url: string
}

export interface Cries {
  latest: string
  legacy: string
}

export interface GameIndex {
  game_index: number
  version: Species
}

export interface Sprites {
  back_default: string
  back_female: null
  back_shiny: string
  back_shiny_female: null
  front_default: string
  front_female: null
  front_shiny: string
  front_shiny_female: null
  animated?: Sprites
}
