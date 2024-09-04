import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';
import { server } from '../constants/config';


const OtherBooks = () => {
    const [books,setBooks] = useState([]);
    useEffect(() => {
        fetch(`${server}/all-books`).then(res =>res.json()).then(data => setBooks(data.slice(4,10)));
    },[])
    return (
        <div>
        <BookCards books={books} headline="Others Books"/>
        </div>
    )
}

export default OtherBooks