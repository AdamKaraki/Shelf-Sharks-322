import { useState, useEffect } from "react";
import { Group, Text, Anchor, Pagination, Button } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SpotlightWrapper(props) {
  const [bookCount, setBookCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rateLimit, setRateLimit] = useState(0);
  const [page, setPage] = useState(1);
  const spotlight = useSpotlight();
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (spotlight.opened && spotlight.query !== "") {
      // clear the spotlight results
      let action_ids = spotlight.actions.map((action) => action.id);
      spotlight.removeActions(action_ids);

      let actions = [];

      // query the API for the current search

      axios
        .get(`${apiURL}/search`, {
          params: {
            query: spotlight.query,
            // don't search google books for this query
            isCatalogSearch: true,
          },
        })
        .then((res) => {
          setBookCount(res.data.length);
          // add the new results
          res.data.forEach((book) => {
            actions.push({
              id: book.uuid,
              title: book.title,
              description: book.author,
              image: book.coverURL,
              onTrigger: () => {
                spotlight.opened = false;
                navigate(`/book/${book.uuid}`);
              },
            });
          });

          // register the actions
          spotlight.registerActions(actions);
        });
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
