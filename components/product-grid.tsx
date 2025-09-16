"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { useState } from "react"

interface ProductGridProps {
  products: Product[]
  className?: string
}

const PRODUCTS_PER_PAGE = 12

export function ProductGrid({ products, className }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center space-y-4">
          {/* Load More Button (Mobile) */}
          {currentPage < totalPages && (
            <div className="md:hidden">
              <Button onClick={handleLoadMore} variant="outline" size="lg">
                Load More ({products.length - endIndex} remaining)
              </Button>
            </div>
          )}

          {/* Page Numbers (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>

          {/* Results Info */}
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
          </p>
        </div>
      )}
    </div>
  )
}
