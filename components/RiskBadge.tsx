interface RiskBadgeProps {
  level: "BAJO" | "MEDIO" | "ALTO"
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const styles = {
    BAJO: "bg-green-100 text-green-800 border-green-200",
    MEDIO: "bg-yellow-100 text-yellow-800 border-yellow-200",
    ALTO: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[level]}`}>
      {level}
    </span>
  )
}
