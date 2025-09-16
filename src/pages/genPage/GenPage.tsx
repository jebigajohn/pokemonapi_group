import { useEffect } from "react"
import { useParams } from "react-router"
import { usePokedex } from "../../context/PokemonContext"

import LoadingMorePokemon from "../../component/loadingMorePokemon/LoadingMorePokemon"

export default function GenPage() {
  const { genId } = useParams()
  const { generationResult, setGeneration } = usePokedex()

  useEffect(() => {
    if (genId) setGeneration(Number(genId))
  }, [genId, setGeneration])

  if (!generationResult.length) return <div>Noch keine Daten für Gen {genId}</div>

  return (
    <div>
      <LoadingMorePokemon />
    </div>
  )
}
