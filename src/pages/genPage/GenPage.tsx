import { useEffect } from 'react'
import { useParams } from 'react-router'
import { usePokedex } from '../../context/PokemonContext'
import PokemonCard from '../../component/pokemonCard/PokemonCard'
import LoadingMorePokemon from '../../component/loadingMorePokemon/LoadingMorePokemon'

export default function GenPage() {
  const { genId } = useParams()
  const { generationResult, setGeneration } = usePokedex()

  useEffect(() => {
    if (genId) setGeneration(Number(genId))
  }, [genId, setGeneration])

  if (!generationResult.length)
    return <div>Noch keine Daten für Gen {genId}</div>

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {' '}
      {generationResult.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
      <LoadingMorePokemon />
    </div>
  )
}
