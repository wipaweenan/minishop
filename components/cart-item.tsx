"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QuantitySelector } from "@/components/quantity-selector"
import type { CartItem } from "@/contexts/cart-context"
import { useCart } from "@/contexts/cart-context"

interface CartItemProps {
  item: CartItem
  className?: string
}

export function CartItemComponent({ item, className }: CartItemProps) {
  const { dispatch } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      productId: item.product.id,
      quantity: newQuantity,
    })
  }

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ITEM",
      productId: item.product.id,
    })
  }

  const itemTotal = item.product.price * item.quantity

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-md overflow-hidden">
              <Image
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/products/${item.product.id}`}
              className="font-semibold hover:text-primary transition-colors line-clamp-2"
            >
              {item.product.name}
            </Link>
            <p className="text-sm text-muted-foreground capitalize mt-1">{item.product.category}</p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4">
                <QuantitySelector
                  value={item.quantity}
                  onChange={handleQuantityChange}
                  className="scale-90 origin-left"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right">
                <div className="font-semibold">${itemTotal.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">${item.product.price} each</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
