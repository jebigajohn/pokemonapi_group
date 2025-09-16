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
        className={" px-3 py-2 rounded-md text-sm bg-bgbtn border border-black/10 rounded-2xl hover:bg-btnHover"}
        title={cry ? "Play Cry" : "Cry not found"}>
        Play Cry
      </button>
      {cry && <audio ref={audioRef} src={cry} preload="none" />}
    </>
  )
}
