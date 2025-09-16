import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the product you're looking for. It may have been removed or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
