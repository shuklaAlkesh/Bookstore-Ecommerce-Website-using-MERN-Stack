import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';
import { server } from '../constants/config';

const BestSellerBook = () => {

  const [books,setBooks] = useState([]);

  useEffect(() => {
    fetch(`${server}/all-books`).then(res =>res.json()).then(data => setBooks(data.slice(0,8)));
  },[])
  return (
    <div>
      <BookCards books={books} headline="Best Seller Books"/>
    </div>
  )
}

export default BestSellerBook