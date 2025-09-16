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

      <div className="relative card max-w-2xl w-full overflow-hidden rounded-md border bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 flex items-center justify-center">
            {detailLoading ? (
              <div>Lädt…</div>
            ) : selectedPokemon ? (
              <img
                src={
                  selectedPokemon.sprites.other?.showdown.front_default ??
                  selectedPokemon.sprites.other?.["official-artwork"].front_default
                }
                alt={selectedPokemon.name}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div>Keine Daten</div>
            )}
          </div>
          <div className="md:w-1/2 p-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-bold capitalize">
                {selectedPokemon?.name ?? (detailLoading ? "Lädt…" : "—")}
              </h2>
              <button onClick={onClose} className="rounded-full px-2 py-1 text-sm hover:bg-black/10">
                ✕
              </button>
            </div>

            {detailError && <div className="mt-2 text-sm text-red-600">{detailError}</div>}

            {selectedPokemon && (
              <>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {selectedPokemon.types.map((type, index) => (
                    <TypeBadge key={index} type={type.type.name} />
                  ))}
                </div>

                <ul className="mt-4 text-sm grid grid-cols-2 gap-y-1">
                  <li>
                    <span className="text-gray-500">ID:</span> {selectedPokemon.id}
                  </li>
                  <li>
                    <span className="text-gray-500">Base XP:</span> {selectedPokemon.base_experience}
                  </li>
                  <li>
                    <span className="text-gray-500">Höhe:</span> {selectedPokemon.height}
                  </li>
                  <li>
                    <span className="text-gray-500">Gewicht:</span> {selectedPokemon.weight}
                  </li>
                </ul>
                <div className="mt-4">
                  <CryButton pokemon={selectedPokemon} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
