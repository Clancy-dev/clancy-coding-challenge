import React from 'react';

// Define the type for params
interface Params {
  slug: string;
}


export default function Order({ params }: { params: Params }) {
  return (
    <div>
      Product Order Page: {params.slug}
    </div>
  );
}
