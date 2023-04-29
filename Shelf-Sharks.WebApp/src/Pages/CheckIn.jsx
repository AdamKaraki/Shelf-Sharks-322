import { Stack, Title, Flex } from "@mantine/core";
import BookCard from "../Books/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckIn(props) {
  const [books, setBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiURL}/books`).then((response) => {
      setBooks(response.data);
    });
  }, [returnedBooks]);

  const onCheckIn = (book) => {
    // set book as checked in
    book.isCheckedOut = false;

    // update book in database
    axios.put(`${apiURL}/books/${book.uuid}`, book);

    // add book to returned books array
    setReturnedBooks([...returnedBooks, book]);
    
    // reload page
    window.location.reload();
  };

  // Filter checked-out books
  const checkedOutBooks = books.filter((book) => {
    return book.isCheckedOut && !returnedBooks.includes(book);
  });

  return (
    <Stack>
      <Title order={3} mb="md">
        Checked Out Books
      </Title>
      <Flex
        miw={200}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        wrap="wrap"
      >
        {checkedOutBooks.map((book) => {
          return <BookCard book={book} onCheckIn={onCheckIn} />;
        })}
      </Flex>
    </Stack>
  );
}
