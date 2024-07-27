import { Button, Tooltip } from 'antd'
import React from 'react'
import { RiRefreshLine } from 'react-icons/ri'

type ButtonRefetchProps = {
  handleClick?: () => void
  isLoading?: boolean
}

export default function ButtonRefetch({ handleClick, isLoading }: ButtonRefetchProps) {
  return (
    <Tooltip title="Làm mới" placement="rightTop" color={'info'} key={'info'}>
      <Button
        onClick={handleClick}
        className="text-xl"
        loading={isLoading}
        icon={<RiRefreshLine className={isLoading ? 'animate-spin ' : ''} />}
      />
    </Tooltip>
  )
}
