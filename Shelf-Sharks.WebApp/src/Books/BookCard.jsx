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
} from "@mantine/core";
import {
  IconBook,
  IconBookDownload,
  IconBookUpload,
  IconUser,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function BookCard(props) {
  const theme = useMantineTheme();
  const [book, setBook] = useState(props.book);
  let navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const formatDescription = (description, maxWords) => {
    let words = description.split(" ");
    if (words.length > maxWords) {
      return description.split(" ").slice(0, maxWords).join(" ") + "...";
    } else {
      return description;
    }
  };

  return (
    <MediaQuery smallerThan="lg" styles={{ maxWidth: "inherit" }}>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        miw={350}
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

        <Group position="apart" mt="md" mb="xs">
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
        </Group>

        <Stack justify="space-between" h={200}>
          <Stack spacing={1}>
            <Text size="md" weight={500}>
              Description
            </Text>
            <Text size="sm" color="dimmed">
              {props.fullPage
                ? book.description
                : formatDescription(book.description, 30)}
            </Text>
          </Stack>
          {book.isCheckedOut ? (
            <>
              <List>
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
                    <b> {book.dateCheckedOut.toLocaleDateString()}</b>
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
                    <b>{book.dateReturnBy.toLocaleDateString()}</b>
                  </Text>{" "}
                </List.Item>
              </List>
            </>
          ) : (
            <Group grow>
              {!props.fullPage ? (
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
              {!props.isCheckedOut ? (
                <Button
                  variant="light"
                  color="red"
                  onClick={async () => {
                    // send axios request to check out book
                    var res = await axios.post(`${apiURL}/checkout`, {
                      isbn: book.isbn,
                    });
                    if (res.status === 200) {
                      // set isCheckedOut to true
                      setBook({ ...book, isCheckedOut: true });
                    } else {
                      console.error("Error checking out book: " + res.status);
                    }
                  }}
                >
                  Check Out
                </Button>
              ) : (
                <Button
                  variant="light"
                  color="green"
                  onClick={async () => {
                    // send axios request to check out book
                    var res = await axios.post(`${apiURL}/return`, {
                      isbn: book.isbn,
                    });
                    if (res.status === 200) {
                      // set isCheckedOut to true
                      setBook({ ...book, isCheckedOut: false });
                    } else {
                      console.error("Error returning book: " + res.status);
                    }
                  }}
                >
                  Return
                </Button>
              )}
            </Group>
          )}
        </Stack>
      </Card>
    </MediaQuery>
  );
}
