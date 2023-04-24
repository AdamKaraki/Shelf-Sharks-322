import {
  Stack,
  Title,
  Flex,
  Group,
  ActionIcon,
  Text,
  Container,
  Image,
  Center,
} from "@mantine/core";
import { IconBook } from "@tabler/icons";
import { IconArrowBack } from "@tabler/icons";
import BookCard from "../Books/BookCard";
import { useNavigate } from "react-router-dom";
import { useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Book(props) {
  const theme = useMantineTheme();
  let { book_uuid } = useParams();
  const [book, setBook] = useState(null);
  let navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getBook = async () => {
      const response = await fetch(`${apiURL}/book/${book_uuid}`);
      const data = await response.json();
      setBook(data);
    };
    getBook();
  }, []);

  return (
    <Stack spacing="lg">
      <Group mb="lg">
        <ActionIcon onClick={goBack}>
          <IconArrowBack />
        </ActionIcon>
        {book ? (
          <Stack spacing={0}>
            <Title order={3}>{book.title}</Title>
            <Text order={4} color="dimmed">
              {book.author}
            </Text>
            <Text order={4} color="dimmed">
              ISBN: {book.isbn}
            </Text>
          </Stack>
        ) : (
          <Title order={3}>Loading...</Title>
        )}
      </Group>
      <Container size="sm">
        {book ? <BookCard book={book} fullPage /> : <Text>Loading...</Text>}
      </Container>
    </Stack>
  );
}
