import React,{ useRef, useState } from 'react';
import { Button, Checkbox, Textarea, Label, Select, TextInput } from 'flowbite-react';

const UploadBook = () => {
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

  const handleBookSubmit = (event) => {
    event.preventDefault(); // Corrected typo here
    const form = event.target;
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const bookDescription = form.bookDescription.value;
    const bookImageURL = form.imageURL.value; // Corrected name here
    const category = form.categoryName.value;
    const bookPDFURL = form.bookPDFURL.value;
  
    const bookObj = {
      bookTitle,
      authorName,
      bookDescription,
      bookImageURL,
      category,
      bookPDFURL
    };
  
    // send data to database
    fetch("http://localhost:5000/upload-book", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj)
    })
    .then(res => res.json())
    .then(data => {
      alert("Book Uploaded successfully !!!");
      form.reset();
    });
  }
  
  return (
    <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Upload a Book</h2>
        <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" required />
          </div>
          {/* author name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required />
          </div>
            
        </div>

        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" name='imageURL' type="text" placeholder="Book Image URL" required />
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
            <Textarea  id="bookDescription" type="text" name ="bookDescription" placeholder="Write your Book Description" required className='w-full' rows={6} />
          </div>

          {/* book pdf link */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bookPDFURL" value="Book Pdf URL" />
            </div>
            <TextInput id="bookPDFURL" name='bookPDFURL' type="text" placeholder="Book Pdf url" required shadow />
        </div>     
        <Button type="submit" className='mt-5'>Upload Book</Button>
    </form>
    </div>
  )
}

export default UploadBook