"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, CreditCard } from "lucide-react"
import Link from "next/link"

interface CartSummaryProps {
  className?: string
}

export function CartSummary({ className }: CartSummaryProps) {
  const { state } = useCart()

  const subtotal = state.total
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({state.itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {subtotal < 50 && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
          </div>
        )}

        <div className="space-y-2">
          <Link href="/checkout" className="w-full">
            <Button size="lg" className="w-full" disabled={state.items.length === 0}>
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Button>
          </Link>
          <Link href="/products" className="w-full">
            <Button variant="outline" size="lg" className="w-full bg-transparent">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
