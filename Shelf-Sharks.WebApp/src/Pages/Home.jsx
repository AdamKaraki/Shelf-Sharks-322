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
    axios.get(`${apiURL}/books/recently_checked_out`).then((response) => {
      setRecentCheckouts(response.data);
    });
    axios.get(`${apiURL}/books/recently_added`).then((response) => {
      setLatestArrivals(response.data);
    });
  }, []);

  const onReturn = (book) => {
    // set book as not checked out
    book.isCheckedOut = false;

    // remove book from recent checkouts
    setRecentCheckouts(
      recentCheckouts.filter((recentCheckout) => {
        return recentCheckout.uuid !== book.uuid;
      })
    );

    // update book in latest arrivals
    setLatestArrivals(
      latestArrivals.map((latestArrival) => {
        if (latestArrival.uuid === book.uuid) {
          return book;
        }
        return latestArrival;
      })
    );
  };

  const onCheckout = (book) => {
    // set book as checked out
    book.isCheckedOut = true;
    // add book to recent checkouts
    setRecentCheckouts([book, ...recentCheckouts]);
  };

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
                book={book}
                onReturn={onReturn}
                onCheckout={onCheckout}
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
            return <BookCard book={book} onReturn={onReturn} />;
          })}
        </Flex>
      </Stack>
    </Stack>
  );
}
