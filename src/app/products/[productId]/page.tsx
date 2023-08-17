import React from 'react'



export default function ProductDetailPage({
    params,
  }: {
    params: { productId: string };
  }) {
  return (
    <div className='text-red-500 container'>
        {params?.productId}
    </div>
  )
}