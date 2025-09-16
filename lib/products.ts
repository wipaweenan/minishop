export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "fashion",
    name: "Fashion",
    image: "/fashion-clothing-style.jpg",
    productCount: 156,
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/modern-electronics.png",
    productCount: 89,
  },
  {
    id: "beauty",
    name: "Beauty",
    image: "/beauty-cosmetics-skincare.jpg",
    productCount: 67,
  },
  {
    id: "food",
    name: "Food",
    image: "/gourmet-food-organic.jpg",
    productCount: 43,
  },
]

export const products: Product[] = [
  // Fashion
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "/premium-cotton-t-shirt-fashion.jpg",
    category: "fashion",
    rating: 4.5,
    reviews: 128,
    description: "Soft, comfortable premium cotton t-shirt perfect for everyday wear.",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Designer Jeans",
    price: 89.99,
    image: "/designer-jeans-denim-fashion.jpg",
    category: "fashion",
    rating: 4.8,
    reviews: 95,
    description: "High-quality designer jeans with perfect fit and style.",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Casual Sneakers",
    price: 79.99,
    originalPrice: 99.99,
    image: "/casual-sneakers-white-shoes.jpg",
    category: "fashion",
    rating: 4.6,
    reviews: 203,
    description: "Comfortable casual sneakers for everyday activities.",
    inStock: true,
  },

  // Electronics
  {
    id: "4",
    name: "Wireless Headphones",
    price: 199.99,
    image: "/wireless-headphones-black-modern.jpg",
    category: "electronics",
    rating: 4.7,
    reviews: 156,
    description: "Premium wireless headphones with noise cancellation.",
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Smart Watch",
    price: 299.99,
    originalPrice: 349.99,
    image: "/smart-watch-fitness-tracker.jpg",
    category: "electronics",
    rating: 4.4,
    reviews: 89,
    description: "Advanced smart watch with fitness tracking and notifications.",
    inStock: true,
    featured: true,
  },
  {
    id: "6",
    name: "Portable Speaker",
    price: 79.99,
    image: "/portable-bluetooth-speaker.jpg",
    category: "electronics",
    rating: 4.3,
    reviews: 67,
    description: "Compact portable speaker with excellent sound quality.",
    inStock: true,
  },

  // Beauty
  {
    id: "7",
    name: "Organic Face Cream",
    price: 49.99,
    image: "/organic-face-cream-skincare.jpg",
    category: "beauty",
    rating: 4.6,
    reviews: 234,
    description: "Nourishing organic face cream for all skin types.",
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "Luxury Lipstick Set",
    price: 89.99,
    originalPrice: 119.99,
    image: "/luxury-lipstick-set-makeup.jpg",
    category: "beauty",
    rating: 4.8,
    reviews: 145,
    description: "Premium lipstick set with 6 beautiful shades.",
    inStock: true,
  },
  {
    id: "9",
    name: "Anti-Aging Serum",
    price: 79.99,
    image: "/anti-aging-serum-skincare-bottle.jpg",
    category: "beauty",
    rating: 4.5,
    reviews: 178,
    description: "Advanced anti-aging serum with proven results.",
    inStock: true,
  },

  // Food
  {
    id: "10",
    name: "Organic Coffee Beans",
    price: 24.99,
    image: "/organic-coffee-beans-premium.jpg",
    category: "food",
    rating: 4.7,
    reviews: 312,
    description: "Premium organic coffee beans from sustainable farms.",
    inStock: true,
    featured: true,
  },
  {
    id: "11",
    name: "Artisan Chocolate Box",
    price: 39.99,
    originalPrice: 49.99,
    image: "/artisan-chocolate-box-luxury.jpg",
    category: "food",
    rating: 4.9,
    reviews: 87,
    description: "Handcrafted artisan chocolates in elegant packaging.",
    inStock: true,
  },
  {
    id: "12",
    name: "Gourmet Spice Set",
    price: 34.99,
    image: "/gourmet-spice-set-cooking.jpg",
    category: "food",
    rating: 4.4,
    reviews: 156,
    description: "Premium spice collection for gourmet cooking.",
    inStock: true,
  },
]

export const getFeaturedProducts = () => products.filter((p) => p.featured)
export const getProductsByCategory = (category: string) => products.filter((p) => p.category === category)
export const getProductById = (id: string) => products.find((p) => p.id === id)
