import {
  MantineProvider,
  ColorSchemeProvider,
  Text,
  Title,
  Group,
  Stack,
  Flex,
} from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";

import { IconSearch } from "@tabler/icons";

import SharkShell from "./SharkShell";
import ActionsWrapper from "./spotlight/ActionsWrapper";
import BookCard from "./book-view/BookCard";

export default function App() {
  return (
    <ColorSchemeProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <SpotlightProvider
          shortcut={["mod + Space"]}
          actions={[]}
          actionsWrapperComponent={ActionsWrapper}
          searchIcon={<IconSearch size={18} />}
          searchPlaceholder="Search Library..."
          nothingFoundMessage="Nothing found..."
        >
          <SharkShell>
            <Stack>
              <Stack>
                <Title order={3} mb="md">
                  Latest Arrivals
                </Title>
                <Flex
                  miw={500}
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
                  miw={500}
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
          </SharkShell>
        </SpotlightProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
