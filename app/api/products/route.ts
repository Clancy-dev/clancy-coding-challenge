import mongoDBConnect from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// GET Request Handler
export async function GET(request: Request) {
    try {
        // Connect to MongoDB
        await mongoDBConnect();
        
        // Fetch products from the database
        const products = await Product.find();

        return NextResponse.json({
            message: "Ok",
            data: products,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Handle error as an instance of Error
            return NextResponse.json({
                message: "Failed to fetch products",
                error: error.message,
            }, {
                status: 500,
            });
        } else {
            // Handle unknown errors
            return NextResponse.json({
                message: "Failed to fetch products",
                error: "Unknown error occurred",
            }, {
                status: 500,
            });
        }
    }
}

// POST Request Handler
export async function POST(request: Request) {
    try {
        // Get data from the request body
        const { title, description, image }: { title: string, description: string,image: string } = await request.json();

        // Create new product (course)
        const newProduct = { title, description,image };

        // Connect to MongoDB
        await mongoDBConnect();

        // Create product (course) in the database
        await Product.create(newProduct);

        return NextResponse.json({
            message: "Course created successfully",
            data: newProduct,
        }, { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            // Handle error as an instance of Error
            return NextResponse.json({
                message: "Failed to create a Product",
                error: error.message,
            }, {
                status: 500,
            });
        } else {
            // Handle unknown errors
            return NextResponse.json({
                message: "Failed to create a Product",
                error: "Unknown error occurred",
            }, {
                status: 500,
            });
        }
    }
}

// //DELETE Request Handler
// export async function DELETE(request: Request) {
//     try {
//         // Get the product id from query parameters
//         const id = request.nextUrl.searchParams.get("id");
//         if (!id) {
//             return NextResponse.json({
//                 message: "ID is required for deletion",
//             }, { status: 400 });
//         }

//         // Connect to MongoDB
//         await mongoDBConnect();

//         // Delete the product (course) by ID
//         await Product.findByIdAndDelete(id);

//         return NextResponse.json({
//             message: "Course deleted successfully",
//         }, { status: 200 });

//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             // Handle error as an instance of Error
//             return NextResponse.json({
//                 message: "Failed to delete the course",
//                 error: error.message,
//             }, {
//                 status: 500,
//             });
//         } else {
//             // Handle unknown errors
//             return NextResponse.json({
//                 message: "Failed to delete the course",
//                 error: "Unknown error occurred",
//             }, {
//                 status: 500,
//             });
//         }
//     }
// }
