"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantitySelector({ value, onChange, min = 1, max = 99, className }: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(value.toString())

  const handleDecrease = () => {
    const newValue = Math.max(min, value - 1)
    onChange(newValue)
    setInputValue(newValue.toString())
  }

  const handleIncrease = () => {
    const newValue = Math.min(max, value + 1)
    onChange(newValue)
    setInputValue(newValue.toString())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value
    setInputValue(inputVal)

    const numValue = Number.parseInt(inputVal)
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue)
    }
  }

  const handleInputBlur = () => {
    const numValue = Number.parseInt(inputValue)
    if (isNaN(numValue) || numValue < min || numValue > max) {
      setInputValue(value.toString())
    }
  }

  return (
    <div className={cn("flex items-center border rounded-md", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDecrease}
        disabled={value <= min}
        className="h-10 w-10 rounded-none border-r"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="h-10 w-16 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        min={min}
        max={max}
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={handleIncrease}
        disabled={value >= max}
        className="h-10 w-10 rounded-none border-l"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
