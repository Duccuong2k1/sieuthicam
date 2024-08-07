"use client"
import { Spinner } from '@/components/shared/common/Spin';
import React, { useEffect, useState } from 'react'
import UserTablePage from '@/containers/dashboard/user';

type Props = {}

export default function UserPage({}: Props) {

  return (
    <>
      <UserTablePage/>
    </>
  )
}