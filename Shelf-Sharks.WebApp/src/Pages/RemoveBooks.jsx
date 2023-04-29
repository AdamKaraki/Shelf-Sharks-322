import {
  Stack,
  Title,
  Flex,
  Group,
  ActionIcon,
  Center,
  Loader,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import BookCard from "../Books/BookCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RemoveBooks(props) {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // get all books from api
    setLoading(true);
    axios.get(`${apiURL}/books`).then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const onRemove = (book) => {
    // remove book from books array
    setBooks(
      books.filter((removedBook) => {
        return removedBook.uuid !== book.uuid;
      })
    );
  };

  return (
    <Stack>
      <Group>
        <ActionIcon onClick={goBack}>
          <IconArrowBack />
        </ActionIcon>
        <Title order={3}>Remove Books</Title>
      </Group>
      {loading ? (
        <Center h={100}>
          <Loader />
        </Center>
      ) : (
        <Flex
          miw={200}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          wrap="wrap"
        >
          {books.map((book) => {
            return (
              <BookCard
                key={book.uuid}
                book={book}
                removable
                onRemove={onRemove}
              />
            );
          })}
        </Flex>
      )}
    </Stack>
  );
}
