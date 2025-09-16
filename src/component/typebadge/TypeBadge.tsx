const Colors: Record<string, string> = {
  normal: "#9aa0a6",
  fire: "#f57c00",
  water: "#2196f3",
  electric: "#fbc02d",
  grass: "#4caf50",
  ice: "#26c6da",
  fighting: "#d32f2f",
  poison: "#8e24aa",
  ground: "#a1887f",
  flying: "#90a4ae",
  psychic: "#ec407a",
  bug: "#8bc34a",
  rock: "#795548",
  ghost: "#7e57c2",
  dragon: "#5c6bc0",
  dark: "#455a64",
  steel: "#78909c",
  fairy: "#ff80ab",
}

type TypeBadgeProps = {
  type: string
  onClick?: (type: string) => void
}

export default function TypeBadge({ type, onClick }: TypeBadgeProps) {
  const color = Colors[type] ?? "#888"
  return (
    <>
      <div
        onClick={() => onClick?.(type)}
        className="px-4 py-1 w-fit rounded-full text-xs font-medium"
        style={{ background: color + "90" }}>
        {type}
      </div>
    </>
  )
}
