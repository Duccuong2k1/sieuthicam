import { DescriptionProduct } from '@/components/ProductDetail/DescriptionProduct';
import { InfoProduct } from '@/components/ProductDetail/InfoProduct';
import { ListProductSimilarSlider } from '@/components/ProductDetail/ListProductSimilarSlider';
import React from 'react'



export default function ProductDetailPage({
    params,
  }: {
    params: { productId: string };
  }) {
  return (
    <section className='container py-3'>
        <InfoProduct productId={params?.productId}/>
        <DescriptionProduct/>
        <ListProductSimilarSlider />
    </section>
  )
}