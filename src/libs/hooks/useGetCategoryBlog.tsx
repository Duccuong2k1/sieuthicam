import { getCategoryBlogs } from '@/actions/category-blog.action'
import { getAllCategories, getCategories } from '@/actions/category.action'
import { ICategoryBlog } from '@/types/blog'
import { ICategory } from '@/types/category'
import { useEffect, useState, useCallback } from 'react'

export const useGetCategoryBlog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categoryBlogData, setCategoryBlogData] = useState<ICategoryBlog[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const fetchCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null) // Reset error before fetching data
    try {
      const res = await getCategoryBlogs({ page: 1, pageSize: 1000 })
      if (res && res.success) {
        setCategoryBlogData(res.data)
      } else {
        setError('Failed to fetch categories')
      }
    } catch (err) {
      setError('Error fetching category list')
      console.error('Error fetching category list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      fetchCategories()
    }
  }, [isMounted, fetchCategories])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return {
    categoryBlogData,
    isLoading,
    error,
    refreshCategories: fetchCategories, // Provide a way to refresh the categories
  }
}
