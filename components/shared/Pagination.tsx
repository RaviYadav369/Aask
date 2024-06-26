'use client'
import React from 'react'
import { Button } from '../ui/button'

interface Props{
    pageNumber:number;
    isNext:boolean;

}
const Pagination = ({pageNumber,isNext}:Props) => {
    const handleNavigation = (direction: string) => {
        console.log(direction)
    }
  return (
    <div className='flex w-full items-center justify-center gap-2'>
        <Button
        disabled={pageNumber ===1}
        onClick={() => handleNavigation('prev')}
        className='light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border'
        > 
            <p className='body-medium text-dark200_light800'>Prev</p>

        </Button>
        <div className='bg-primary-500 flex justify-center rounded-md px-3.5 py-2'>
            <p className='body-semibold text-light-900'>
            {pageNumber}
            </p>
        </div>
        <Button
        disabled={!isNext}
        onClick={() => handleNavigation('next')}
        className='light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border'
        > 
            <p className='body-medium text-dark200_light800'>Next</p>

        </Button>

    </div>
  )
}

export default Pagination