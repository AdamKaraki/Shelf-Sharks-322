import { Stack, Title, Flex } from "@mantine/core";
import BookCard from "../Books/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckIn(props) {
  const [books, setBooks] = useState([]);

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiURL}/books`).then((response) => {
      setBooks(response.data.filter((book) => book.isCheckedOut === true));
    });
  }, []);

  const onReturn = (book) => {
    // filter book out of books
    setBooks(
      books.filter((existingBook) => {
        return existingBook.uuid !== book.uuid;
      })
    );
  };

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
        {books.map((book) => {
          return <BookCard key={book.uuid} book={book} onReturn={onReturn} />;
        })}
      </Flex>
    </Stack>
  );
}
