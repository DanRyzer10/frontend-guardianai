interface SecurityEvent {
  id: string
  timestamp: string
  sourceIp: string
  attackType: string
  riskLevel: string
  actionTaken: string
  description: string
}

interface BlockedIP {
  ip: string
  blockedAt: string
  reason: string
  attackType: string
  isActive: boolean
}

interface SecuritySummary {
  totalAttacks: number
  attacksByType: { [key: string]: number }
  mostFrequentIp: string
  riskDistribution: { bajo: number; medio: number; alto: number }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function fetchSecurityEvents(): Promise<SecurityEvent[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/logs`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch security events")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching security events:", error)
    // Datos de ejemplo para desarrollo
    return [
      {
        id: "1",
        timestamp: "2024-01-07 14:30:25",
        sourceIp: "192.168.1.100",
        attackType: "SQL Injection",
        riskLevel: "ALTO",
        actionTaken: "bloqueo",
        description: "Intento de inyección SQL detectado",
      },
      {
        id: "2",
        timestamp: "2024-01-07 14:25:10",
        sourceIp: "10.0.0.50",
        attackType: "Port Scan",
        riskLevel: "MEDIO",
        actionTaken: "alerta",
        description: "Escaneo de puertos detectado",
      },
      {
        id: "3",
        timestamp: "2024-01-07 14:20:45",
        sourceIp: "172.16.0.25",
        attackType: "DDoS",
        riskLevel: "ALTO",
        actionTaken: "bloqueo",
        description: "Ataque DDoS detectado",
      },
    ]
  }
}

export async function fetchBlockedIPs(): Promise<BlockedIP[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/ips-bloqueadas`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch blocked IPs")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching blocked IPs:", error)
    // Datos de ejemplo para desarrollo
    return [
      {
        ip: "192.168.1.100",
        blockedAt: "2024-01-07 14:30:25",
        reason: "SQL Injection detectado",
        attackType: "SQL Injection",
        isActive: true,
      },
      {
        ip: "172.16.0.25",
        blockedAt: "2024-01-07 14:20:45",
        reason: "Ataque DDoS",
        attackType: "DDoS",
        isActive: true,
      },
      {
        ip: "203.0.113.45",
        blockedAt: "2024-01-07 13:15:30",
        reason: "Múltiples intentos de acceso",
        attackType: "Brute Force",
        isActive: false,
      },
    ]
  }
}

export async function fetchSecuritySummary(): Promise<SecuritySummary> {
  try {
    const response = await fetch(`${API_BASE_URL}/resumen`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch security summary")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching security summary:", error)
    // Datos de ejemplo para desarrollo
    return {
      totalAttacks: 156,
      attacksByType: {
        "SQL Injection": 45,
        DDoS: 32,
        "Port Scan": 28,
        "Brute Force": 25,
        XSS: 18,
        Malware: 8,
      },
      mostFrequentIp: "192.168.1.100",
      riskDistribution: {
        bajo: 45,
        medio: 67,
        alto: 44,
      },
    }
  }
}
