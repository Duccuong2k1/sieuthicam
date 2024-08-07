'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useEffect, useState } from 'react'
// import Image from 'next/image'
import { Button, Row, Col, Card, Image } from 'antd'
import { MdDeleteOutline, MdOutlineFileUpload } from 'react-icons/md'
import { useToast } from '@/libs/providers/toast-provider'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUploadRaw: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const [isMounted, setIsMounted] = useState(false)
  const toast = useToast()
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const checkImageSize = (imageSizeBytes: number, maxSizeMB = 5) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024 // Chuyển đổi MB thành Bytes
    return imageSizeBytes <= maxSizeBytes
  }

  const onUpload = (result: any) => {
    console.log('result upload', result)
    if (checkImageSize(result?.info?.bytes)) {
      onChange(result.info.secure_url)
    } else {
      toast.warn('Vui lòng tải ảnh < 5MB')
    }
  }

  if (!isMounted) {
    return null
  }
  // console.log('value nhan ve', value)
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {value.map((image: any, index) => (
          <div
            key={index}
            className="flex flex-col  gap-3 items-center justify-between p-2 border rounded-md relative group mb-4"
          >
            <Image alt="Image" src={image} width={100} height={100} style={{ objectFit: 'cover' }} />
            <Button
              danger
              onClick={() => onRemove(image)}
              className="absolute -right-3 -top-3 p-0.5 bg-white drop-shadow-sm hidden group-hover:block z-10"
            >
              <MdDeleteOutline className="text-xl" />
            </Button>
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ktjusc7i" options={{ folder: 'sieu-thi-cam' }}>
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button disabled={disabled} onClick={onClick} className="flex flex-row items-center gap-1">
              <MdOutlineFileUpload className="text-xl" /> Tải ảnh lên
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUploadRaw
