import { useState, useEffect } from "react";
import { Group, Text, Anchor, Pagination } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import axios from "axios";

export default function SpotlightWrapper(props) {
  const [bookCount, setBookCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const spotlight = useSpotlight();

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (spotlight.opened) {
      // clear the spotlight results
      let action_ids = spotlight.actions.map((action) => action.id);
      spotlight.removeActions(action_ids);

      let actions = [];

      // query the API for the current search
      axios
        .post(`${apiURL}/api/books/search`, {
          query: spotlight.query,
          page: page,
        })
        .then((res) => {
          setBookCount(res.data.fullCount);
          // calculate the number of pages
          setTotalPages(Math.ceil(res.data.fullCount / 10));

          // add the new results
          res.data.books.forEach((book) => {
            actions.push({
              id: book.uuid,
              title: book.title,
              description: book.author,
              image: book.coverURL,
              onClick: () => {
                spotlight.close();
                props.history.push(`/books/${book.id}`);
              },
            });
          });
        });

      // register the actions
      spotlight.registerActions(actions);
    }
  }, [spotlight.query, spotlight.opened, page]);

  return (
    <div>
      {props.children}
      <Group
        position="apart"
        px={15}
        py="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        })}
      >
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {bookCount} books found
          </Text>
          <Pagination
            page={page}
            onChange={(page) => setPage(page)}
            size="xs"
            total={totalPages}
          />
        </Group>
      </Group>
    </div>
  );
}
