import React from 'react'

type Props = {
    title:string;
    desc?:string;
}

export  function LabelHeader({title,desc}: Props) {
  return (
    <div className='flex flex-col items-center text-center my-3 lg:mx-0 mx-5'>
        <h4 className='text-2xl lg:text-4xl font-semibold mb-2 text-primary'>{title}</h4>
        <p className='text-primary text-sm lg:text-xl font-light'>{desc}</p>
    </div>
  )
}