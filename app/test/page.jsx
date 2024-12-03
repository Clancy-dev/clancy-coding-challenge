import { categories } from '@/categories'
import React from 'react'

export default function page() {
    const allCategories =categories
    console.log(allCategories)
  return (
    <div>
      {allCategories}
    </div>
  )
}
