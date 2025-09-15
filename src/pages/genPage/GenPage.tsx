import React from 'react'
import { useParams } from 'react-router'
import { usePokedex } from '../../context/PokemonContext'
import PokemonCard from '../../component/pokemonCard/PokemonCard'

export default function GenPage() {
  const { genId } = useParams()
  const { generationResult } = usePokedex()

  if (!generationResult.length)
    return <div>Noch keine Daten für Gen {genId}</div>

  return (
    <div>
      {' '}
      {generationResult.map((p) => (
        <PokemonCard
          key={p.name}
          pokemon={{ id: 0, name: p.name, image: null, types: [] }}
          onclick={() => {}}
        />
      ))}
    </div>
  )
}
