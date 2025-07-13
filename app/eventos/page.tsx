"use client"

import { useState, useEffect } from "react"
import { fetchSecurityEvents } from "@/lib/api"
import type { SecurityEvent } from "@/lib/types"
import RiskBadge from "@/components/RiskBadge"
import ActionBadge from "@/components/ActionBadge"
import { Search, Filter } from "lucide-react"

export default function EventosPage() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<SecurityEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchSecurityEvents()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error("Error loading events:", error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.sourceIp.includes(searchTerm) || event.attackType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (riskFilter !== "all") {
      filtered = filtered.filter((event) => event.riskLevel === riskFilter)
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, riskFilter])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Eventos de Seguridad</h1>
        <p className="text-gray-600">Monitoreo en tiempo real de amenazas detectadas</p>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar por IP o tipo de ataque..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-4 w-4" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="all">Todos los riesgos</option>
            <option value="ALTO">Alto</option>
            <option value="MEDIO">Medio</option>
            <option value="BAJO">Bajo</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Origen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Ataque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel de Riesgo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción Tomada
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{event.sourceIp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.attackType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RiskBadge level={event.riskLevel} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ActionBadge action={event.actionTaken} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron eventos que coincidan con los filtros.</p>
          </div>
        )}
      </div>
    </div>
  )
}
