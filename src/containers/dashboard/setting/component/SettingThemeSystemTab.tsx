import ImageUploadRaw from '@/components/shared/upload-image/ImageUploadRaw'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import SettingHeaderOption from './SettingHeaderOption'

type Props = {}

export default function SettingThemeSystemTab({}: Props) {
  return (
    <div>
      <div>Tạo giao diện header</div>
      <SettingHeaderOption />
      <div>Tạo giao diện footer</div>
    </div>
  )
}
