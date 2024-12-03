// import { getProducts } from '@/app/api/products/route';
import getProducts from '@/app/controllers/getProducts';
import React from 'react';

// Define the type for the product
interface Product {
  id: string;
  slug: string;
  title: string;
  image: string;
  detailed_description: string;
  currentPrice: number;
  brand: string;
  ratings: number;
}

// Define the type for params in the page component
interface Params {
  slug: string;
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;

  // Fetch all products
  const products: Product[] = await getProducts();

  // Find the product by slug
  const product = products.find((product) => product.slug === slug);

  // Handle case when product is not found
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <p>{product.detailed_description}</p>
      <p>Price: ${product.currentPrice}</p>
      <p>Brand: {product.brand}</p>
      <p>Ratings: {product.ratings}</p>
    </div>
  );
}
