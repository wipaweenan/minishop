"use client"

import { Button } from "@/components/ui/button"
import { CartItemComponent } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { useCart } from "@/contexts/cart-context"
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {state.itemCount === 0
                ? "Your cart is empty"
                : `${state.itemCount} item${state.itemCount !== 1 ? "s" : ""} in your cart`}
            </p>
          </div>

          {state.items.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <CartItemComponent key={item.product.id} item={item} />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary className="sticky top-24" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
