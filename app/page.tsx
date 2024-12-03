import React from 'react'
import { getProducts } from './api/products/route';
import { getCategories } from './api/categories/route';
import CategoryListing from './components/CategoryListing';
import ProductListing from './components/ProductListing';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
// import CategoryListing from '@/components/CategoryListing'; // Ensure this is imported correctly
// import ProductListing from '@/components/ProductListing'; // Ensure this is imported correctly

// Define the types for the data you expect to fetch
interface Category {
  id: string;
  title: string;
  image: string;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  image: string;
  category_id: number;
}

// Define the page component, and make sure it is async for fetching data
export default async function Page() {
  // Fetch categories and products
  const categories: Category[] = await getCategories();
  const products: Product[] = await getProducts();

  // Filtering products based on category_id
  const allTelevisions = products.filter((product) => product.category_id === 1);
  const allFridges = products.filter((product) => product.category_id === 2);
  const allMicrowaves = products.filter((product) => product.category_id === 3);
  const allLaundryMachines = products.filter((product) => product.category_id === 4);

  return (
    <div className="home-page">

      <Header/>
      <HeroSection/>
      {/* <a href="./contact">Contact</a> */}
      
      {/* Category Listing */}
      <CategoryListing data={categories} />
      
      {/* Product Listings */}
      <ProductListing data={products} title="All Products" headerBg="blue" />
      
      {/* Filtered Product Listings */}
      <ProductListing data={allTelevisions} title="All Televisions" headerBg="green" />
      <ProductListing data={allFridges} title="All Fridges" headerBg="purple" />
      <ProductListing data={allMicrowaves} title="All Microwaves" headerBg="black" />
      <ProductListing data={allLaundryMachines} title="All Laundry Machines" headerBg="grey" />
    </div>
  );
}
