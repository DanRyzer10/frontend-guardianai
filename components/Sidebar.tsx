"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, AlertTriangle, Ban, BarChart3 } from "lucide-react"

const navigation = [
  { name: "Eventos", href: "/eventos", icon: AlertTriangle },
  { name: "IPs Bloqueadas", href: "/bloqueos", icon: Ban },
  { name: "Resumen", href: "/resumen", icon: BarChart3 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Shield className="h-8 w-8 text-blue-400" />
        <span className="ml-2 text-xl font-bold text-white">CyberDefense</span>
      </div>
      <nav className="flex flex-1 flex-col px-6 py-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-colors ${
                    isActive ? "bg-slate-800 text-blue-400" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
