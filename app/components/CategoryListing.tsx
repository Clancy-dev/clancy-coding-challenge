import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Define types for the category
interface Category {
  id: string;
  title: string;
  image: string;
}

// Define the prop type for CategoryListing
interface CategoryListingProps {
  data: Category[];
}

const CategoryListing: React.FC<CategoryListingProps> = ({ data }) => {
  return (
    <section className="category-listing">
      <div className="section-header">
        <h2>Categories</h2>
        <Link href="/create">    
            <h2>Add New Category</h2>
          </Link>
      </div>

      <div className="grid-col-4">
        {data.map((category) => (
          <Link href="#" className="grid-card" key={category.id}>
            <div className="category-image">
              <Image
                src={category.image}
                alt={category.title}
                layout="fill" // Use layout='fill' for responsive images
                objectFit="cover" // Optional: use objectFit to control how the image behaves within the container
              />
            </div>
            <h2 className="category-title">{category.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryListing;
