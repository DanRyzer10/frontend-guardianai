interface ActionBadgeProps {
  action: "bloqueo" | "alerta" | "parche"
}

export default function ActionBadge({ action }: ActionBadgeProps) {
  const styles = {
    bloqueo: "bg-red-100 text-red-800 border-red-200",
    alerta: "bg-orange-100 text-orange-800 border-orange-200",
    parche: "bg-blue-100 text-blue-800 border-blue-200",
  }

  const labels = {
    bloqueo: "Bloqueado",
    alerta: "Alerta",
    parche: "Parcheado",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[action]}`}
    >
      {labels[action]}
    </span>
  )
}
