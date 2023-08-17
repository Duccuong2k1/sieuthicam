import { CategoriesProductList } from '@/components/Products/CategoriesProductList'
import { BoxWarp } from '@/components/shared/common/BoxWarp'
import { Button } from '@/components/shared/utils/form/Button'
import React from 'react'

type Props = {}

export default function ProductsPage({}: Props) {
  return (
    <section className="container py-3">
      <BoxWarp className=''>
        <CategoriesProductList/>
      </BoxWarp>
    </section>
  )
}