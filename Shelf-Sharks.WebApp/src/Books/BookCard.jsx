import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  List,
  Center,
  ThemeIcon,
  useMantineTheme,
  Stack,
  MediaQuery,
  Title,
  Flex,
  Transition,
} from "@mantine/core";
import {
  IconBook,
  IconBookDownload,
  IconBookUpload,
  IconUser,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { modals } from "@mantine/modals";

export default function BookCard(props, { show = true }) {
  const theme = useMantineTheme();
  const [book, setBook] = useState(props.book);
  let navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const cardRef = useRef();

  useEffect(() => {
    setBook(props.book);
  }, [props.book]);

  const showError = (message) => {
    modals.openContextModal({
      modal: "error",
      innerProps: {
        modalBody: message,
      },
    });
  };

  const formatDescription = (description, maxWords) => {
    let words = description.split(" ");
    if (words.length > maxWords) {
      return description.split(" ").slice(0, maxWords).join(" ") + "...";
    } else {
      return description;
    }
  };

  const returnBook = () => {
    // send axios request to check out book
    axios
      .post(`${apiURL}/return`, {
        uuid: book.uuid,
      })
      .then((res) => {
        // /return returns a book object
        // so let's update ours with the new one
        setBook(res.data);
        if (typeof props.onReturn === "function") {
          props.onReturn(res.data);
        }
      })
      .catch((err) => {
        showError(err.response.data);
        console.error("Error returning book: " + err.response.status);
      });
  };

  const checkoutBook = () => {
    // send axios request to check out book
    axios
      .post(`${apiURL}/checkout`, {
        uuid: book.uuid,
      })
      .then((res) => {
        // /checkout returns a book object
        // so let's update ours with the new one
        setBook(res.data);
        if (typeof props.onCheckout === "function") {
          props.onCheckout(res.data);
        }
      })
      .catch((err) => {
        showError(err.response.data);
        console.error("Error checking out book: " + err.response.status);
      });
  };

  const addBook = () => {
    // send axios request to add book to library
    axios
      .post(`${apiURL}/add`, {
        googleBooksId: book.googleBooksId,
      })
      .then((res) => {
        if (typeof props.onAdd === "function") {
          props.onAdd(book);
        }
      })
      .catch((err) => {
        showError(err.response.data);
        console.error("Error adding book: " + err.response.status);
      });
  };

  const removeBook = () => {
    // send axios request to remove book from library
    axios
      .post(`${apiURL}/remove`, {
        uuid: book.uuid,
      })
      .then((res) => {
        if (typeof props.onRemove === "function") {
          props.onRemove(book);
        }
      })
      .catch((err) => {
        showError(err.response.data);
        console.error("Error removing book: " + err.response.status);
      });
  };

  return (
    <MediaQuery smallerThan="lg" styles={{ maxWidth: "inherit" }}>
      {show ? (
        <Card
          ref={cardRef}
          style={{ animation: "fadeIn 0.5s ease-in-out" }}
          shadow="sm"
          p="lg"
          radius="md"
          miw={350}
          mih={props.fullPage ? 500 : 300}
          maw={props.fullPage ? "100%" : 250}
          sx={{ flex: 1 }}
          withBorder
        >
          <Card.Section
            sx={{
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            }}
          >
            <Center>
              <Image
                withPlaceholder
                placeholder={<IconBook size={props.fullPage ? 100 : 30} />}
                height={props.fullPage ? 300 : 120}
                width={"auto"}
                miw={90}
                src={book.coverURL}
                alt={book.title}
              />
            </Center>
          </Card.Section>
          <Card.Section inheritPadding>
            <Group spacing="md" my="md">
              {!props.fullPage && !props.newBook ? (
                <Button
                  variant="light"
                  color="blue"
                  onClick={() => {
                    navigate(`/book/${book.uuid}`);
                  }}
                >
                  Learn More
                </Button>
              ) : (
                <></>
              )}

              {!props.newBook && !props.removable ? (
                !book.isCheckedOut ? (
                  <Button variant="light" color="red" onClick={checkoutBook}>
                    Check Out
                  </Button>
                ) : (
                  <Button variant="light" color="green" onClick={returnBook}>
                    Return
                  </Button>
                )
              ) : (
                <></>
              )}

              {props.newBook ? (
                <Button variant="light" onClick={addBook} color="blue">
                  Add to Library
                </Button>
              ) : (
                <></>
              )}

              {props.removable ? (
                <Button variant="light" color="red" onClick={removeBook}>
                  Remove
                </Button>
              ) : (
                <></>
              )}
            </Group>
            {book.isCheckedOut ? (
              <>
                <List spacing="xs">
                  <List.Item
                    key="dateCheckedOut"
                    icon={
                      <ThemeIcon color="orange" size={24} radius="xl">
                        <IconBookUpload size={16} />
                      </ThemeIcon>
                    }
                  >
                    <Text>
                      Date checked out:
                      <b>
                        {" "}
                        {new Date(book.dateCheckedOut).toLocaleDateString()}
                      </b>
                    </Text>
                  </List.Item>

                  <List.Item
                    key="dateReturnBy"
                    icon={
                      <ThemeIcon color="green" size={24} radius="xl">
                        <IconBookDownload size={16} />
                      </ThemeIcon>
                    }
                  >
                    <Text>
                      Date to return:{" "}
                      <b> {new Date(book.dateReturnBy).toLocaleDateString()}</b>
                    </Text>{" "}
                  </List.Item>
                </List>
              </>
            ) : (
              <></>
            )}
          </Card.Section>
          <Card.Section inheritPadding>
            <Stack spacing="sm" my="sm">
              <Stack spacing={0}>
                {props.fullPage ? (
                  <Title order={3}>{book.title}</Title>
                ) : (
                  <Text weight={500}>{book.title}</Text>
                )}
                <Text size="md">{book.author}</Text>
              </Stack>
              {book.isCheckedOut ? (
                <Badge color="red" variant="light">
                  Checked Out
                </Badge>
              ) : (
                <Badge color="green" variant="light">
                  Available
                </Badge>
              )}
            </Stack>
            <Stack justify="space-between" spacing="lg">
              <Stack spacing={1} mb="xl">
                <Text size="md" weight={500}>
                  Description
                </Text>
                <Text size="sm" color="dimmed">
                  {props.fullPage
                    ? book.description
                    : formatDescription(book.description, 30)}
                </Text>
              </Stack>
            </Stack>
          </Card.Section>
        </Card>
      ) : null}
    </MediaQuery>
  );
}
