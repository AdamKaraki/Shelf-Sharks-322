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
} from "@mantine/core";
import {
  IconBook,
  IconBookDownload,
  IconBookUpload,
  IconUser,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookCard(props) {
  const theme = useMantineTheme();
  const [book, setBook] = useState(props.book);
  let navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setBook(props.book);
  }, [props.book]);

  const formatDescription = (description, maxWords) => {
    let words = description.split(" ");
    if (words.length > maxWords) {
      return description.split(" ").slice(0, maxWords).join(" ") + "...";
    } else {
      return description;
    }
  };

  const returnBook = async () => {
    // send axios request to check out book
    var res = await axios.post(`${apiURL}/return`, {
      uuid: book.uuid,
    });
    if (res.status === 200) {
      // set isCheckedOut to true
      setBook({ ...book, isCheckedOut: false });
      if (typeof props.onReturn === "function") {
        props.onReturn(book);
      }
    } else {
      console.error("Error returning book: " + res.status);
    }
  };

  const checkoutBook = async () => {
    // send axios request to check out book
    var res = await axios.post(`${apiURL}/checkout`, {
      uuid: book.uuid,
    });
    if (res.status === 200) {
      // set isCheckedOut to true
      setBook({ ...book, isCheckedOut: true });
      if (typeof props.onCheckout === "function") {
        props.onCheckout(book);
      }
    } else {
      console.error("Error checking out book: " + res.status);
    }
  };

  const addBook = async () => {
    // send axios request to add book to library
    var res = await axios.post(`${apiURL}/add`, {
      googleBooksId: book.googleBooksId,
    });
    if (res.status !== 200) {
      console.error("Error adding book: " + res.status);
      if (typeof props.onAdd === "function") {
        props.onAdd(book);
      }
    }
  };

  return (
    <MediaQuery smallerThan="lg" styles={{ maxWidth: "inherit" }}>
      <Card
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
            {!props.newBook ? (
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
              <Button variant="light" onClick={addBook} color="blue">
                Add to Library
              </Button>
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
                    <b> {new Date(book.dateCheckedOut).toLocaleDateString()}</b>
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
    </MediaQuery>
  );
}
