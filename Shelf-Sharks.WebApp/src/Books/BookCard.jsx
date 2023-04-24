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
    if (description.length > maxWords) {
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
        miw={300}
        maw={250}
        sx={{ flex: 1 }}
        withBorder
      >
        <Card.Section
          sx={{
            backgroundColor: theme.backgroundColor,
          }}
        >
          <Center>
            <Image
              withPlaceholder
              placeholder={<IconBook size={30} />}
              height={120}
              width={80}
              src={book.coverURL}
              alt={book.title}
            />
          </Center>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{book.title}</Text>
          <Text size="md">ISBN: {book.isbn}</Text>
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
            <Text size="md">Description:</Text>
            <Text size="sm" color="dimmed">
              {formatDescription(book.description, 30)}
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
            <Button.Group>
              <Button
                variant="light"
                color="blue"
                fullWidth
                onClick={() => {
                  navigate(`/books/${book.uuid}`);
                }}
              >
                Learn More
              </Button>
              <Button
                variant="light"
                color="red"
                fullWidth
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
            </Button.Group>
          )}
        </Stack>
      </Card>
    </MediaQuery>
  );
}
