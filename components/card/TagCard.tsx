import React from 'react'
import Link from 'next/link'
import Tags from '../shared/Tags'

interface Props {
    tag: {
        _id:string,
        name:string,
        questions: []
    }
}
const TagCard = async ({tag}:Props) => {
    
  return (
    <Link
      href={`tags/${tag._id}`}
      className=" shadow-light100_darknone max-xs:min-w-full xs:w-[250px] w-full"
    >
      <article className="background-light900_dark200 light-border flex flex-col items-center justify-center  rounded-2xl border p-8 ">
        <Tags _id={tag._id} name={tag.name} />
        <p className='text-dark400_light500 small-medium mt-4 text-center'>
            <span className='body-semibold primary-text-gradient '>
                {tag.questions.length}+Questions
            </span>
        </p>
        <div className="text-dark400_light500  mt-4 text-center ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Volup 
        </div>
      </article>
    </Link>
  )
}

export default TagCard