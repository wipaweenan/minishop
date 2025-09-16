"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const defaultFilters: FilterState = {
  search: "",
  category: "",
  priceRange: [0, 500],
  minRating: 0,
  sortBy: "featured",
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    
    if (category || search) {
      setFilters((prev) => ({
        ...prev,
        ...(category && { category }),
        ...(search && { search })
      }))
    }
  }, [searchParams])

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Rating filter
      if (product.rating < filters.minRating) {
        return false
      }

      return true
    })

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // For demo, we'll sort by ID (assuming higher ID = newer)
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      case "featured":
      default:
        // Featured products first, then by rating
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
        break
    }

    return filtered
  }, [filters])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-muted-foreground mt-1">
              Discover our complete collection of {products.length} amazing products
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredAndSortedProducts.length} Product{filteredAndSortedProducts.length !== 1 ? "s" : ""} Found
                </h2>
              </div>
            </div>

            <ProductGrid products={filteredAndSortedProducts} />
          </main>
        </div>
      </div>
    </div>
  )
}
