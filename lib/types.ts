export interface SecurityEvent {
  id: string
  timestamp: string
  sourceIp: string
  attackType: string
  riskLevel: "BAJO" | "MEDIO" | "ALTO"
  actionTaken: "bloqueo" | "alerta" | "parche"
  description?: string
}

export interface BlockedIP {
  ip: string
  blockedAt: string
  reason: string
  attackType: string
  isActive: boolean
}

export interface SecuritySummary {
  totalAttacks: number
  attacksByType: Record<string, number>
  mostFrequentIp: string
  riskDistribution: {
    bajo: number
    medio: number
    alto: number
  }
}
