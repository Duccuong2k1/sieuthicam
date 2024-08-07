import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IProductAddOrder } from '@/types/order'

interface OrderContextType {
  productAddOrder: IProductAddOrder | null
  productAddOrderList: IProductAddOrder[]
  setProductAddOrder: (order: IProductAddOrder) => void
  setProductAddOrderList: (orders: IProductAddOrder[]) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productAddOrder, setProductAddOrder] = useState<IProductAddOrder | null>(null)
  const [productAddOrderList, setProductAddOrderList] = useState<IProductAddOrder[]>([])

  const value = {
    productAddOrder,
    productAddOrderList,
    setProductAddOrder,
    setProductAddOrderList,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
