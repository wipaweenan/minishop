"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface CartIconProps {
  className?: string
}

export function CartIcon({ className }: CartIconProps) {
  const { state } = useCart()

  return (
    <Link href="/cart">
      <Button variant="outline" size="sm" className={className}>
        <div className="relative">
          <ShoppingBag className="h-4 w-4 mr-2" />
          {state.itemCount > 0 && (
            <Badge className="absolute -top-3 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {state.itemCount > 99 ? "99+" : state.itemCount}
            </Badge>
          )}
        </div>
        Cart 
      </Button>
    </Link>
  )
}
