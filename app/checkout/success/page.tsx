"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Home, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(() => `MS${Date.now().toString().slice(-6)}`)

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>

          {/* Order Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order Number:</span>
                  <span className="text-primary font-mono">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-600 font-medium">Confirmed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-4">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">Order Processing</h4>
                <p className="text-muted-foreground">We'll prepare your items for shipment</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">Shipping</h4>
                <p className="text-muted-foreground">Your order will be shipped within 2-3 business days</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">Delivery</h4>
                <p className="text-muted-foreground">Delivered to your doorstep in 5-7 business days</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Questions about your order? Contact us at{" "}
              <a href="mailto:support@minishop.com" className="text-primary hover:underline">
                support@minishop.com
              </a>{" "}
              or call{" "}
              <a href="tel:+1234567890" className="text-primary hover:underline">
                (123) 456-7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
