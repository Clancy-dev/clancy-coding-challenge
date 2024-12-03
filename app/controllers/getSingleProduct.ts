// Assuming `Product` is a type representing the structure of a product, adjust accordingly
interface Product {
    data: any; // Define the type of the product data here (e.g., { id: number, name: string, ... })
}

export default async function getSingleProduct(id: string | number): Promise<any> {  // Specify `id` as string or number
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    if (!api_url) {
        throw new Error('API base URL is not defined');
    }

    console.log(api_url);

    try {
        const response = await fetch(`${api_url}/api/products/${id}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to fetch product with id: ${id}`);
        }

        const product = await response.json();
        return product.data;  // Return product.data assuming the structure fits
    } catch (error) {
        console.log(error);
        throw error;  // Rethrow the error or handle it as needed
    }
}
