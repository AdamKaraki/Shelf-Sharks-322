import { Stack, Title, Flex } from "@mantine/core";
import BookCard from "../Books/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home(props) {
  const [latestArrivals, setLatestArrivals] = useState([]);
  const [recentCheckouts, setRecentCheckouts] = useState([]);

  useEffect(() => {
    // load recent checkouts and latest arrivals
    axios.get("/api/books/latest/checkouts").then((response) => {
      setRecentCheckouts(response.data);
    });
    axios.get("/api/books/latest/arrivals").then((response) => {
      setLatestArrivals(response.data);
    });
  }, []);

  return (
    <Stack>
      <Stack>
        <Title order={3} mb="md">
          Latest Arrivals
        </Title>
        <Flex
          miw={200}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          wrap="wrap"
        >
          {latestArrivals.map((book) => {
            return (
              <BookCard
                checkedOut={book.checkedOut}
                numAvailable={book.numAvailable}
                description={book.description}
                title={book.title}
                author={book.author}
                isbn={book.isbn}
                coverUrl={book.coverUrl}
              />
            );
          })}
        </Flex>
      </Stack>
      <Stack>
        <Title order={3} mb="md">
          Recent Check-outs
        </Title>
        <Flex
          miw={200}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          wrap="wrap"
        >
          {recentCheckouts.map((book) => {
            return (
              <BookCard
                checkedOut={book.checkedOut}
                numAvailable={book.numAvailable}
                description={book.description}
                title={book.title}
                author={book.author}
                isbn={book.isbn}
                coverUrl={book.coverUrl}
              />
            );
          })}
        </Flex>
      </Stack>
    </Stack>
  );
}
