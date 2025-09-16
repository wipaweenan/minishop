import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Category } from "@/lib/products"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          className,
        )}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
            <p className="text-sm opacity-90">{category.productCount} products</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
