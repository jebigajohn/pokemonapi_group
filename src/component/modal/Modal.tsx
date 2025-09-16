import { useEffect, useState } from "react"
import { usePokedex } from "../../context/PokemonContext"
import TypeBadge from "../typebadge/TypeBadge"
import CryButton from "../cryButton/CryButton"

type ModalProps = {
  open: boolean
  onClose: () => void
}

export default function Modal({ open, onClose }: ModalProps) {
  const { selectedPokemon, detailLoading, detailError } = usePokedex()

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative card max-w-2xl w-full overflow-hidden rounded-md border">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold capitalize">{selectedPokemon?.name ?? "…"}</h2>
              </div>
              <button onClick={onClose} className="rounded-full px-2 py-1 text-sm hover:bg-black/10">
                ✕
              </button>
            </div>
            <h3>{selectedPokemon?.name}</h3>

            <div className="mt-3 flex gap-2 flex-wrap">
              {selectedPokemon?.past_types.map((t) => (
                <TypeBadge key={t.slot} type={t.type.name} />
              ))}
            </div>

            <div className="mt-4 flex gap-2">{selectedPokemon && <CryButton pokemon={selectedPokemon} />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
