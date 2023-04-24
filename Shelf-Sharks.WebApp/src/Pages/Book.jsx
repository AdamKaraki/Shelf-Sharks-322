import { Stack, Title, Flex, Group, ActionIcon, Text } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import BookCard from "../Books/BookCard";
import { useNavigate } from "react-router-dom";
import { useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Book(props) {
  const theme = useMantineTheme();
  let { book_uuid } = useParams();
  const [book, setBook] = useState({});
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
    <Stack>
      <Group>
        <ActionIcon onClick={goBack}>
          <IconArrowBack />
        </ActionIcon>
        <Title order={3}>{book.title}</Title>
      </Group>
      <Text>{book.description}</Text>
    </Stack>
  );
}
