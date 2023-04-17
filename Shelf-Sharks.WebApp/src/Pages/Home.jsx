import { Stack, Title, Flex } from "@mantine/core";
import BookCard from "../Books/BookCard";

export default function Home(props) {
  return (
    <Stack>
      <Stack>
        <Title order={3} mb="md">
          Latest Arrivals
        </Title>
        <Flex
          miw={200}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          wrap="wrap"
        >
          <BookCard checkedOut={false} numAvailable={12} />
        </Flex>
      </Stack>
      <Stack>
        <Title order={3} mb="md">
          Recent Check-outs
        </Title>
        <Flex
          miw={200}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          wrap="wrap"
        >
          <BookCard
            checkedOut={true}
            numAvailable={0}
            checkedOutDate={new Date()}
            returnDate={new Date("5/10/23")}
          />
          <BookCard
            checkedOut={true}
            numAvailable={0}
            checkedOutDate={new Date()}
            returnDate={new Date("5/10/23")}
          />
          <BookCard
            checkedOut={true}
            numAvailable={0}
            checkedOutDate={new Date()}
            returnDate={new Date("5/10/23")}
          />
          <BookCard
            checkedOut={true}
            numAvailable={0}
            checkedOutDate={new Date()}
            returnDate={new Date("5/10/23")}
          />
        </Flex>
      </Stack>
    </Stack>
  );
}
