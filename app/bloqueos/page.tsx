"use client"

import { useState, useEffect } from "react"
import { fetchBlockedIPs } from "@/lib/api"
import type { BlockedIP } from "@/lib/types"
import { Ban, CheckCircle, XCircle } from "lucide-react"

export default function BloqueosPage() {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlockedIPs() {
      try {
        const data = await fetchBlockedIPs()
        setBlockedIPs(data)
      } catch (error) {
        console.error("Error loading blocked IPs:", error)
      } finally {
        setLoading(false)
      }
    }
    loadBlockedIPs()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const activeBlocks = blockedIPs.filter((ip) => ip.isActive)
  const inactiveBlocks = blockedIPs.filter((ip) => !ip.isActive)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">IPs Bloqueadas</h1>
        <p className="text-gray-600">Gestión de direcciones IP bloqueadas por el sistema</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-red-50 p-2 border border-red-200">
              <Ban className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bloqueadas Activas</p>
              <p className="text-2xl font-bold text-gray-900">{activeBlocks.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-gray-50 p-2 border border-gray-200">
              <XCircle className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bloqueadas Inactivas</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveBlocks.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-50 p-2 border border-blue-200">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{blockedIPs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* IPs Activamente Bloqueadas */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">IPs Activamente Bloqueadas</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Bloqueo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Ataque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Razón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeBlocks.map((blockedIP, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{blockedIP.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blockedIP.blockedAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blockedIP.attackType}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{blockedIP.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 border border-red-200">
                        Bloqueada
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {activeBlocks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay IPs activamente bloqueadas.</p>
            </div>
          )}
        </div>
      </div>

      {/* Historial de Bloqueos */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Historial de Bloqueos</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Bloqueo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Ataque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Razón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inactiveBlocks.map((blockedIP, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{blockedIP.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blockedIP.blockedAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blockedIP.attackType}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{blockedIP.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 border border-gray-200">
                        Inactiva
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {inactiveBlocks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay historial de bloqueos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
