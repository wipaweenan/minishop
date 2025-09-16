"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductGallery } from "@/components/product-gallery"
import { QuantitySelector } from "@/components/quantity-selector"
import { ProductCard } from "@/components/product-card"
import { CartIcon } from "@/components/cart-icon"
import { UserMenu } from "@/components/user-menu"
import { getProductById, getProductsByCategory } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()

  if (!product) {
    notFound()
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", product, quantity })
    // Reset quantity after adding to cart
    setQuantity(1)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn("h-5 w-5", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-foreground capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={[product.image]} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", product.inStock ? "bg-green-500" : "bg-red-500")} />
              <span className={cn("font-medium", product.inStock ? "text-green-700" : "text-red-700")}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <QuantitySelector value={quantity} onChange={setQuantity} className="w-fit" />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleAddToCart} size="lg" className="flex-1">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={cn(isWishlisted && "text-red-500 border-red-500")}
                  >
                    <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                  </Button>

                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            <Separator />

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Secure payment & buyer protection</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description} This premium product is crafted with attention to detail and quality materials.
                Perfect for everyday use, it combines functionality with style to meet your needs.
              </p>

              <h4 className="font-semibold mt-6 mb-3">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>High-quality materials and construction</li>
                <li>Designed for durability and long-lasting use</li>
                <li>Stylish design that complements any setting</li>
                <li>Easy to use and maintain</li>
                <li>Backed by our quality guarantee</li>
              </ul>

              <h4 className="font-semibold mt-6 mb-3">Specifications:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Category:</span> <span className="capitalize">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium">Rating:</span> {product.rating}/5 stars
                </div>
                <div>
                  <span className="font-medium">Reviews:</span> {product.reviews} customer reviews
                </div>
                <div>
                  <span className="font-medium">Availability:</span> {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
