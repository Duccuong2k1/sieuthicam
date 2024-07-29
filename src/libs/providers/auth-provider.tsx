'use client'
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { useToast } from './toast-provider'

import { usePathname, useRouter } from 'next/navigation'
import {
  ClearValueLocalStorage,
  ClearValueToken,
  GetValueLocalStorage,
  GetValueToken,
  SetValueLocalStorage,
  SetValueToken,
} from '../constants/get-value-storage'
import { GLOBAL } from '../constants/global'
import { jwtDecode } from 'jwt-decode'
import { loginAccount, refetchAccessToken } from '@/actions/auth.action'
import { IUser } from '@/types/user'
import { getUserCurrent } from '@/actions/user.action'

export const AuthContext = createContext<
  Partial<{
    user: IUser
    setUser: (user: IUser) => any
    admin: IUser
    setAdmin: (admin: IUser) => any
    isOpenLoginForm: boolean
    setIsOpenLoginForm: (isOpen: boolean) => any
    googleSignIn: () => any
    logout: () => void
    loginAdmin: (email: string, password: string) => Promise<void>
  }>
>({})

export function AuthProvider({ ...props }) {
  const [user, setUser] = useState<IUser>()
  const [admin, setAdmin] = useState<IUser>()

  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false)
  const [isTokenExpired, setIsTokenExpired] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const pathName = usePathname()

  const logout = () => {
    ClearValueToken(GLOBAL.ACCESS_TOKEN)
    ClearValueLocalStorage(GLOBAL.ADMIN)
    ClearValueLocalStorage(GLOBAL.USER)

    setUser(null as any)
    setAdmin(null as any)
    router.push('/login')
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      const response = await loginAccount(email, password)

      if (response && response.success) {
        toast.success('Đăng nhập thành công')
        SetValueLocalStorage(GLOBAL.ADMIN, response.data)
        SetValueToken(GLOBAL.ACCESS_TOKEN, response.accessToken)
        // if (response.refetchToken) {
        // Cookies.set(GLOBAL.REFETCH_TOKEN, response.refetchToken)
        // }
        setAdmin(response.data)
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại sai mật khẩu hoặc email!')
      console.error('Login admin failed', error)
    }
  }

  const checkTokenExpirationAndRefresh = useCallback(async () => {
    const token = GetValueToken(GLOBAL.ACCESS_TOKEN)
    if (token) {
      const decodedToken = jwtDecode(token) as { exp: number }
      const currentTime = Date.now()
      const tokenExpirationTime = decodedToken.exp * 1000
      const thirtyMinutesInMillis = 30 * 60 * 1000

      if (currentTime >= tokenExpirationTime - thirtyMinutesInMillis) {
        // Token is about to expire within 30 minutes, refresh it using refetchToken
        const response = await refetchAccessToken()
        if (response && response.success) {
          console.log('response nhan ve', response)
          SetValueToken(GLOBAL.ACCESS_TOKEN, response.data.newAccessToken)

          setIsTokenExpired(false)
          loadInfoAdmin() // Reload user info with new token
        } else {
          setIsTokenExpired(true)
        }
      } else {
        setIsTokenExpired(false)
      }
    } else {
      setIsTokenExpired(true)
    }
  }, [])

  const loadInfoAdmin = async () => {
    try {
      const token = GetValueToken(GLOBAL.ACCESS_TOKEN)
      if (token) {
        let res = await getUserCurrent()
        if (res && res.success) {
          SetValueLocalStorage(GLOBAL.ADMIN, res.data)
          setAdmin(res.data)
        }
      } else {
        setAdmin(null as any)
        ClearValueToken(GLOBAL.ACCESS_TOKEN)
        ClearValueLocalStorage(GLOBAL.ADMIN)
      }
    } catch (error) {
      setAdmin(null as any)
      ClearValueToken(GLOBAL.ACCESS_TOKEN)
      ClearValueLocalStorage(GLOBAL.ADMIN)
      console.log('get user error', error)
    }
  }

  useEffect(() => {
    checkTokenExpirationAndRefresh()
  }, [pathName])

  useEffect(() => {
    if (isTokenExpired) {
      if (pathName.startsWith('/dashboard')) {
        toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!')
        logout()
      }
    } else {
      loadInfoAdmin()
    }
  }, [isTokenExpired])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        admin,
        setAdmin,
        isOpenLoginForm,
        setIsOpenLoginForm,

        logout,
        loginAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
