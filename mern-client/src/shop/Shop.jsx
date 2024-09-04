import React, { useEffect,useState } from 'react'
import { Card } from 'flowbite-react';
import { server } from '../constants/config';

const Shop = () => {
  const [books,setbooks] = useState([]);
  useEffect(() => {
    fetch(`${server}/all-books`).then(res =>res.json()).then(data => setbooks(data));
  },[])
  return (
    <div className='mt-28 px-4 lg:px24'>
      <h2 className='text-5xl font-bold text-center'>All Books  are Here</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-col-3 grid-cols-1'>
        {
          books.map(books => <Card>
            <img src={books.imageURL} alt="" className='h-96'/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {books.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
            <button className='bg-blue-700 font-bold text-white py-2 rounded  '>Buy Now</button>
          </Card>)
        }
      </div>
    </div>
  )
}

export default Shop