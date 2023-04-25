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
  Loader,
} from "@mantine/core";
import { IconBook } from "@tabler/icons";
import { IconArrowBack } from "@tabler/icons";
import BookCard from "../Books/BookCard";
import { useNavigate } from "react-router-dom";
import { useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Book(props) {
  const theme = useMantineTheme();
  let { book_uuid } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  let navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiURL}/book/${book_uuid}`).then((res) => {
      setBook(res.data);
      setLoading(false);
    });
  }, [book_uuid]);

  return (
    <Stack spacing="lg">
      {!loading && book != null ? (
        <Group mb="lg">
          <ActionIcon onClick={goBack}>
            <IconArrowBack />
          </ActionIcon>
          <Stack spacing={0}>
            <Title order={3}>{book.title}</Title>
            <Text order={4} color="dimmed">
              {book.author}
            </Text>
            <Text order={4} color="dimmed">
              ISBN: {book.isbn}
            </Text>
          </Stack>
        </Group>
      ) : (
        <Center h={100}>
          <Loader />
        </Center>
      )}
      <Container size="sm">
        {book ? <BookCard book={book} fullPage /> : <Text>Loading...</Text>}
      </Container>
    </Stack>
  );
}
