import { Stack, Title, Flex } from "@mantine/core";
import BookCard from "../Books/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home(props) {
  const [latestArrivals, setLatestArrivals] = useState([]);
  const [recentCheckouts, setRecentCheckouts] = useState([]);
  const [books, setBooks] = useState([]);

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiURL}/books`).then((response) => {
      setBooks(response.data);
    });
    // load recent checkouts and latest arrivals
    // axios.get(`${apiURL}/latest/checkouts`).then((response) => {
    //   setRecentCheckouts(response.data);
    // });
    // axios.get(`${apiURL}/latest/arrivals`).then((response) => {
    //   setLatestArrivals(response.data);
    // });
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
            return <BookCard book={book} />;
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
          {books.map((book) => {
            return <BookCard book={book} />;
          })}
        </Flex>
      </Stack>
    </Stack>
  );
}
