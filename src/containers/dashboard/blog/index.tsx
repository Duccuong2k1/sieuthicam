import React from 'react'
import { DataTableBlog } from './component/DataTableBlog'
import { DataTableCategoryBlog } from './component/DataTableCategoryBlog'

type Props = {}

export default function BlogTablePage({}: Props) {
  return (
    <div className="">
      <DataTableCategoryBlog />
      <DataTableBlog />
    </div>
  )
}
