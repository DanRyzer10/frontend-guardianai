"use client"

import { useState, useEffect } from "react"
import { fetchSecuritySummary } from "@/lib/api"
import type { SecuritySummary } from "@/lib/types"
import StatCard from "@/components/StatCard"
import { Shield, AlertTriangle, TrendingUp, Wifi } from "lucide-react"

export default function ResumenPage() {
  const [summary, setSummary] = useState<SecuritySummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await fetchSecuritySummary()
        setSummary(data)
      } catch (error) {
        console.error("Error loading summary:", error)
      } finally {
        setLoading(false)
      }
    }
    loadSummary()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Error al cargar el resumen</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resumen de Seguridad</h1>
        <p className="text-gray-600">Estadísticas generales del sistema de defensa</p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total de Ataques" value={summary.totalAttacks} icon={Shield} color="blue" />
        <StatCard title="Riesgo Alto" value={summary.riskDistribution.alto} icon={AlertTriangle} color="red" />
        <StatCard title="Riesgo Medio" value={summary.riskDistribution.medio} icon={TrendingUp} color="yellow" />
        <StatCard title="IP Más Frecuente" value={summary.mostFrequentIp} icon={Wifi} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por Nivel de Riesgo */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Nivel de Riesgo</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Alto</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold text-gray-900 mr-2">{summary.riskDistribution.alto}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(summary.riskDistribution.alto / summary.totalAttacks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Medio</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold text-gray-900 mr-2">{summary.riskDistribution.medio}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(summary.riskDistribution.medio / summary.totalAttacks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Bajo</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold text-gray-900 mr-2">{summary.riskDistribution.bajo}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(summary.riskDistribution.bajo / summary.totalAttacks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ataques por Tipo */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ataques por Tipo</h2>
          <div className="space-y-3">
            {Object.entries(summary.attacksByType)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{type}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-gray-900 mr-2">{count}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / Math.max(...Object.values(summary.attacksByType))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
