import {React,useState }from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Textarea, Label, Select, TextInput } from 'flowbite-react';
import { server } from '../constants/config';

const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle,authorName,imageURL,category,bookDescription,bookPDFURL} = useLoaderData();


  const bookCatergories = [
    "Fiction",
    "Non-fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "AutoBiography",
    "History",
    "Self-help",
    "Memoir",
    "Buishness",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design",
  ]

  const [selectedBookCategory,setSelectedBookCategory] = useState(bookCatergories[0]);
  const handleChangeSelectedValue =(event) =>{
      setSelectedBookCategory(event.target.value);
  }
  //  handle Book Submissions

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const bookDescription = form.bookDescription.value;
    const bookImageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookPDFURL = form.bookPDFURL.value;
  
    const UpdatebookObj = {
      bookTitle,
      authorName,
      bookDescription,
      bookImageURL,
      category,
      bookPDFURL
    };
  
    // Update data to database
    fetch(`${server}/book/${id}`, {
      method: "PATCH", // Corrected to uppercase
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(UpdatebookObj)
    }).then(res => res.json())
      .then(data => {
        alert("Book is Updated successfully !!!");
      });
  }
  
  
  return (
    <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Update the Book Data</h2>
        <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name='bookTitle' type="text" defaultValue={bookTitle} placeholder="Book Name" required />
          </div>
          {/* author name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name='authorName' type="text"  defaultValue={authorName} placeholder="Author Name" required />
          </div>
            
        </div>

        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" name='imageURL' type="text" defaultValue={imageURL} placeholder="Book Image URL" required />
          </div>
          {/* second Row*/}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
                <Label htmlFor="inputState" value="Book category" />
            </div>
            <Select id="inputState" name="categoryName" className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                {
                    bookCatergories.map((option) => <option key={option} value={option}>{option}</option>)
                }
            </Select>
          </div>
         </div>
         {/* book description */}
         <div>
            <div className="mb-2 block">
              <Label htmlFor="bookDescription" value="Your email" />
            </div>
            <Textarea  id="bookDescription" type="text" name ="bookDescription" placeholder="Write your Book Description" required className='w-full' rows={6} defaultValue={bookDescription} />
          </div>

          {/* book pdf link */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bookPDFURL" value="Book Pdf URL" />
            </div>
            <TextInput id="bookPDFURL" name='bookPDFURL' type="text" defaultValue={bookPDFURL} placeholder="Book Pdf url" required shadow />
        </div>     
        <Button type="submit" className='mt-5'>Update Book</Button>
    </form>
    </div>
  )
}

export default EditBooks