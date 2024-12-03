import mongoDBConnect from "@/libs/mongodb";
import Product from "@/models/product";

import { NextResponse } from "next/server";

// GET Request Handler - Fetch a single course by id
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Destructuring to get the course ID from params

    try {
        // Connect to the database
        await mongoDBConnect();

        // Fetch the course with the given ID from the database
        const product = await Product.findOne({ _id: id });

        if (!product) {
            return NextResponse.json(
                {
                    message: "Course not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Ok",
                data: product,
            }
        );
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Handle known errors
            return NextResponse.json(
                {
                    message: "Failed to fetch course",
                    error: error.message,
                },
                {
                    status: 500,
                }
            );
        } else {
            // Handle unknown errors
            return NextResponse.json(
                {
                    message: "Failed to fetch a product",
                    error: "Unknown error occurred",
                },
                {
                    status: 500,
                }
            );
        }
    }
}

// PUT Request Handler - Update a course
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Destructuring to get the course ID from params

    try {
        // Destructure the title and description from the request body
        const { newTitle: title, newDescription: description,newImage: image }: { newTitle: string, newDescription: string ,newImage: string} = await request.json();

        // Create the new course data
        const newProduct = {
            title,
            description,
            image
        };

        // Connect to the database
        await mongoDBConnect();

        // Update the course with the given ID
        const updatedCourse = await Product.findByIdAndUpdate(id, newProduct, { new: true });

        if (!updatedCourse) {
            return NextResponse.json(
                {
                    message: "Course not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Course Updated successfully",
                data: updatedCourse,
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            // Handle known errors
            return NextResponse.json(
                {
                    message: "Failed to update product",
                    error: error.message,
                },
                {
                    status: 500,
                }
            );
        } else {
            // Handle unknown errors
            return NextResponse.json(
                {
                    message: "Failed to update course",
                    error: "Unknown error occurred",
                },
                {
                    status: 500,
                }
            );
        }
    }
}

// DELETE Request Handler - Delete a course
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Destructuring to get the course ID from params

    try {
        // Connect to the database
        await mongoDBConnect();

        // Delete the course by its ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                {
                    message: "Course not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Product deleted successfully",
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Handle known errors
            return NextResponse.json(
                {
                    message: "Failed to delete course",
                    error: error.message,
                },
                {
                    status: 500,
                }
            );
        } else {
            // Handle unknown errors
            return NextResponse.json(
                {
                    message: "Failed to delete a product.",
                    error: "Unknown error occurred",
                },
                {
                    status: 500,
                }
            );
        }
    }
}
