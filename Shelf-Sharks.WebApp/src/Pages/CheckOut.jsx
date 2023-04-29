import { Stack, Title, Flex } from "@mantine/core";
import BookCard from "../Books/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckOut(props) {
  const [books, setBooks] = useState([]);

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiURL}/books`).then((response) => {
      setBooks(response.data);
    });
  }, []);

  const onCheckOut = (book) => {
    // set book as checked in
    book.isCheckedOut = false;

    // update book in books array
    setBooks(
      books.map((existingBook) => {
        if (existingBook.uuid === book.uuid) {
          return book;
        }
        return existingBook;
      })
    );
  };

  const onCheckout = (book) => {
    // set book as checked out
    book.isCheckedOut = true;

    // update book in books array
    setBooks(
      books.map((existingBook) => {
        if (existingBook.uuid === book.uuid) {
          return book;
        }
        return existingBook;
      })
    );
  };

  // Filter out checked-out books
  const availableBooks = books.filter((book) => {
    return !book.isCheckedOut;
  });

  return (
    <Stack>
      <Title order={3} mb="md">
        Available Books
      </Title>
      <Flex
        miw={200}
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        wrap="wrap"
      >
        {availableBooks.map((book) => {
          return (
            <BookCard
              book={book}
              onCheckOut={onCheckOut}
              onCheckout={onCheckout}
            />
          );
        })}
      </Flex>
    </Stack>
  );
}
