import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Define the type for the product
interface Product {
  id: string;
  slug: string;
  title: string;
  image: string;
}

// Define the prop type for ProductListing
interface ProductListingProps {
  data: Product[];
  title: string;
  headerBg: string;
}

const ProductListing: React.FC<ProductListingProps> = ({ data, title, headerBg }) => {
  return (
    <section className="category-listing product-listing">
      <div className="section-header" style={{ background: headerBg }}>
        <h2>{title}</h2>
      </div>

      <div className="grid-col-4">
        {data.map((product) => (
          <Link href={`/details/${product.slug}`} className="grid-card" key={product.id}>
            <div className="category-image" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={product.image}
                alt={product.title}
                layout="fill" // Use layout="fill" for responsive images
                objectFit="cover" // Optional: ensures the image covers the container
              />
            </div>
            <h2 className="category-title">{product.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductListing;
