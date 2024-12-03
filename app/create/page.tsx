'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AddCourse() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null); // State for holding the image file
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate that title, description, and image are provided
    if (!title || !description || !image) {
      alert('All fields are required.');
      return;
    }

    const newProduct = {
      title,
      description,
      image,
    };

    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    if (!api_url) {
      console.error('API URL is missing');
      return;
    }

    try {
      let uploadedImageUrl = image;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'your_upload_preset');

        const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.secure_url) {
          uploadedImageUrl = uploadData.secure_url;
        }
      }

      const response = await fetch(`${api_url}/api/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.status === 201) {
        router.push('/');
      } else {
        alert('Failed to create product.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0])); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="input-group">
        <label htmlFor="title">Product Name</label>
        <input
          type="text"
          id="title"
          placeholder="Enter product name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="description">Product Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter product description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="image-url">Image URL (Optional)</label>
        <input
          type="text"
          id="image-url"
          placeholder="Enter product image URL (optional)"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
      </div>

      <div className="input-group file-upload">
        <label htmlFor="image-upload">Upload Image</label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {image && (
        <div className="image-preview">
          <img src={image} alt="Image preview" />
        </div>
      )}

      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
}
