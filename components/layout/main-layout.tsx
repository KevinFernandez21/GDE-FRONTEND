"use client"

import { useApp } from "@/contexts/app-context"
import Sidebar from "./sidebar"
import Header from "./header"
import DashboardModule from "@/components/modules/dashboard/dashboard-module"
import InventoryModule from "@/components/modules/inventory/inventory-module"
import TraceabilityModule from "@/components/modules/traceability/traceability-module"
import ManagementModule from "@/components/modules/management/management-module"
import ReportsModule from "@/components/modules/reports/reports-module"
import ConfigurationModule from "@/components/modules/configuration/configuration-module"

export default function MainLayout() {
  const { activeModule } = useApp()

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardModule />
      case "inventario":
        return <InventoryModule />
      case "trazabilidad":
        return <TraceabilityModule />
      case "gestion":
        return <ManagementModule />
      case "reportes":
        return <ReportsModule />
      case "configuracion":
        return <ConfigurationModule />
      default:
        return <DashboardModule />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{renderModule()}</main>
      </div>
    </div>
  )
}
