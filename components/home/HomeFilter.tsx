'use client'
import { HomePageFilters } from '@/constants/filters'
import React from 'react'
import { Button } from '../ui/button'



const HomeFilter = () => {
    const Active = 'newest';
  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex'>
        {HomePageFilters.map((item)=>(
            <Button
            key={item.value}
            onClick={()=>{}}
            className={`${Active === item.value ?" bg-primary-100 text-primary-500":"bg-light-800 dark:text-light-500 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bgda"} body-medium rounded-lg px-6 py-3 capitalize shadow-none`}
            >
                {item.name}
            </Button>
        ))}

    </div>
  )
}

export default HomeFilter