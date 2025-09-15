import { useRef } from "react"
import type { IPokemonDescription } from "../../interfaces/IPokemon"

type CryButtonProps = {
  pokemon: IPokemonDescription | null
}

export default function CryButton({ pokemon }: CryButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const cry = pokemon?.cries?.latest ?? null

  function playCry() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      void audioRef.current.play()
    }
  }

  return (
    <>
      <button
        onClick={playCry}
        disabled={!cry}
        className={`px-3 py-1.5 rounded-md text-sm ${
          cry ? "bg-white/10 hover:bg-white/20" : "bg-white/5 opacity-60 cursor-not-allowed"
        }`}
        title={cry ? "Play Cry" : "Cry not found"}>
        Cry
      </button>

      {cry && <audio ref={audioRef} src={cry} preload="none" />}
    </>
  )
}
