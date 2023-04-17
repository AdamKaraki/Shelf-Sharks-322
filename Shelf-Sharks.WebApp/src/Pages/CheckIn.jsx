import { Stack, Title, Flex, Group, ActionIcon } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import BookCard from "../Books/BookCard";
import { useNavigate } from "react-router-dom";

export default function CheckIn(props) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Stack>
      <Group>
        <ActionIcon onClick={goBack}>
          <IconArrowBack />
        </ActionIcon>
        <Title order={3}>Check In Books</Title>
      </Group>
    </Stack>
  );
}
