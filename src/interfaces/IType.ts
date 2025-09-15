export interface IType {
  count: number
  next: string
  previous: null
  results: ITypeResult[]
}

export interface ITypeResult {
  name: string
  url: string
}

export interface ITypeDescription {
  game_indices: IGameIndex[]
  generation: IGeneration
  id: number
  name: string
  names: IName[]
  pokemon: IPokemon[]
  past_damage_relations: any[]
  // move_damage_class: Generation
  // moves: Generation[]
  // damage_relations: DamageRelations
  sprites: Sprites
}

export interface IPokemon {
  pokemon: IGeneration
  slot: number
}

export interface IGeneration {
  name: string
  url: string
}

export interface IGameIndex {
  game_index: number
  generation: IGeneration
}

export interface IName {
  language: IGeneration
  name: string
}

// export interface DamageRelations {
//   double_damage_from: Generation[]
//   double_damage_to: any[]
//   half_damage_from: any[]
//   half_damage_to: Generation[]
//   no_damage_from: Generation[]
//   no_damage_to: Generation[]
// }

export interface Sprites {
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-ix": GenerationIx
  "generation-v": GenerationV
  "generation-vi": { [key: string]: Colosseum }
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export interface GenerationIii {
  colosseum: Colosseum
  emerald: Colosseum
  "firered-leafgreen": Colosseum
  "ruby-saphire": Colosseum
  xd: Colosseum
}

export interface Colosseum {
  name_icon: string
}

export interface GenerationIv {
  "diamond-pearl": Colosseum
  "heartgold-soulsilver": Colosseum
  platinum: Colosseum
}

export interface GenerationIx {
  "scarlet-violet": Colosseum
}

export interface GenerationV {
  "black-2-white-2": Colosseum
  "black-white": Colosseum
}

export interface GenerationVii {
  "lets-go-pikachu-lets-go-eevee": Colosseum
  "sun-moon": Colosseum
  "ultra-sun-ultra-moon": Colosseum
}

export interface GenerationViii {
  "brilliant-diamond-and-shining-pearl": Colosseum
  "legends-arceus": Colosseum
  "sword-shield": Colosseum
}
