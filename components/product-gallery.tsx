"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export function ProductGallery({ images, productName, className }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  // For demo, we'll use the same image multiple times to simulate a gallery
  const galleryImages = images.length > 1 ? images : [images[0], images[0], images[0], images[0]]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={galleryImages[currentImage] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover"
          priority
        />

        {galleryImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors",
                currentImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground",
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
