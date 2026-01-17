import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate } from "react-router-dom"
import {  useState } from "react"

export function Header( ) {
    const [showWarn, setShowWarn] = useState(false)
    const [nextPath, setNextPath] = useState<string | null>(null)

    const menuItems = [
        { label: "Principal", path: "/principal" },
    ]

    const location = useLocation()
    const navigate = useNavigate()
    const currentPath = location.pathname


    const handleNavigate = (path: string) => {
        const isLeavingImportacao = currentPath === "/importacao" && path !== "/importacao"
        const dadosTemp = JSON.parse(sessionStorage.getItem("import-temp") || "[]")

        if (isLeavingImportacao && Array.isArray(dadosTemp) && dadosTemp.length > 0) {
            setNextPath(path)
            setShowWarn(true)
            return
        }
        navigate(path)
    }

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 
                 flex items-center justify-between 
                 bg-white border-b border-gray-200 shadow-sm 
                 px-6 h-16"
        >

            <nav className="flex items-center gap-4 px-4">
                {menuItems.map((item) => (
                    <Button
                        key={item.path}
                        variant="ghost"
                        className={cn(
                            "text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-medium transition-all",
                            currentPath === item.path &&
                            "text-orange-600 bg-orange-100 hover:bg-orange-100"
                        )}
                        onClick={() => handleNavigate(item.path)}
                    >
                        {item.label}
                    </Button>
                ))}
            </nav>
        </header>
    )
}