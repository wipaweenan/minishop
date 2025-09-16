"use client"

import { Button } from "@/components/ui/button"
import { CheckoutForm } from "@/components/checkout-form"
import { CartSummary } from "@/components/cart-summary"
import { useCart } from "@/contexts/cart-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { state } = useCart()
  const router = useRouter()

  // Redirect to cart if no items
  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/cart")
    }
  }, [state.items.length, router])

  if (state.items.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-1">Complete your order details below</p>
        </div>

        {/* Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary className="sticky top-24" />
          </div>
        </div>
      </div>
    </div>
  )
}
