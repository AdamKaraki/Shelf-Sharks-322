import {
  Stack,
  Title,
  Flex,
  Group,
  ActionIcon,
  Input,
  Button,
  List,
  Loader,
  Center,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import BookCard from "../Books/BookCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AddBooks(props) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const onAdd = (book) => {
    // remove book from books array
    setBooks(
      books.filter((addedBook) => {
        return addedBook.googleBooksId !== book.googleBooksId;
      })
    );
  };

  const search = () => {
    setLoading(true);
    axios
      .get(`${apiURL}/search`, {
        params: {
          query: query,
          // search google books for this query
          isCatalogSearch: false,
        },
      })
      .then((res) => {
        // set books one by one with slight delay
        // for animation
        // loop through books
        res.data.forEach((book, index) => {
          // set book with delay
          setTimeout(() => {
            setBooks((prevBooks) => [...prevBooks, book]);
          }, 100 * index);
        });
        setLoading(false);
      });
  };

  return (
    <Stack>
      <Group>
        <ActionIcon onClick={goBack}>
          <IconArrowBack />
        </ActionIcon>
        <Title order={3}>Add New Books</Title>
      </Group>
      <Stack>
        <Group grow>
          <Input
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search by Title, ISBN or Author..."
          />
          <Button onClick={search} sx={{ maxWidth: "100px" }}>
            Search
          </Button>
        </Group>
      </Stack>
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
              <BookCard key={book.uuid} book={book} onAdd={onAdd} newBook />
            );
          })}
        </Flex>
      )}
    </Stack>
  );
}
