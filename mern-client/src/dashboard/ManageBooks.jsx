import React, { useEffect, useState } from 'react';
import { Table, TableBody } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { server } from '../constants/config';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch(`${server}/all-books`)
      .then(res => res.json())
      .then(data => setAllBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${server}/book/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Book is deleted Successfully!");
        // Update the list of books after deletion
        const updatedBooks = allBooks.filter(book => book._id !== id);
        setAllBooks(updatedBooks);
      } else {
        console.error('Failed to delete book:', response.statusText);
        alert("Failed to delete book. Please try again later.");
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert("An error occurred while deleting the book. Please try again later.");
    }
  };

  return (
    <div className='px-4 my-4 '>
      <h2 className='mb-8 text-3xl font-bold'>Manage your Books</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Books Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Prices</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {allBooks.map((book, index) => (
          <TableBody className='divide-y' key={book._id}>
            <Table.Row key={book._id} className='divide-y'>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.bookTitle}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>$199</Table.Cell>
              <Table.Cell style={{ display: 'flex', alignItems: 'center' }}>
                <Link
                  to={`/admin/dashboard/edit-books/${book._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </TableBody>
        ))}
        <TableBody></TableBody>
      </Table>
    </div>
  );
};

export default ManageBooks;
