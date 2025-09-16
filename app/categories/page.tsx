import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/products"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">Shop by Category</h1>
          <p className="text-muted-foreground">
            Explore our carefully curated categories to find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">Browse all our products or use our search feature</p>
          <Link href="/products">
            <Button size="lg">
              View All Products
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
