import {
  MantineProvider,
  ColorSchemeProvider,
  Text,
  Title,
  Group,
  Stack,
  Flex,
  Button,
} from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useColorScheme } from "@mantine/hooks";
import { useState } from "react";

import { IconSearch } from "@tabler/icons";

import SharkShell from "./SharkShell";
import SpotlightWrapper from "./spotlight/SpotlightWrapper";
import Home from "./Pages/Home";
import CheckIn from "./Pages/CheckIn";
import CheckOut from "./Pages/CheckOut";
import Book from "./Pages/Book";
import AddBooks from "./Pages/AddBooks";
import RemoveBooks from "./Pages/RemoveBooks";

const ErrorModal = ({ id, innerProps, context }) => (
  <>
    <Title order={3}>{innerProps.modalBody}</Title>
    <Button
      fullWidth
      mt="md"
      color="red"
      onClick={() => context.closeModal(id)}
    >
      Understood
    </Button>
  </>
);

export default function App() {
  // hook will return either 'dark' or 'light' on client
  // and always 'light' during ssr as window.matchMedia is not available
  const preferredColorScheme = useColorScheme("dark");
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <SpotlightProvider
            shortcut={["mod + Space"]}
            actions={[]}
            actionsWrapperComponent={SpotlightWrapper}
            searchIcon={<IconSearch size={18} />}
            searchPlaceholder="Search Library..."
            nothingFoundMessage="No results found in library."
          >
            <ModalsProvider modals={{ error: ErrorModal }}>
              <SharkShell
                toggleColorScheme={toggleColorScheme}
                colorScheme={colorScheme}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/check-in" element={<CheckIn />} />
                  <Route path="/check-out" element={<CheckOut />} />
                  <Route path="/add-books" element={<AddBooks />} />
                  <Route path="/remove-books" element={<RemoveBooks />} />
                  <Route path="/book/:book_uuid" element={<Book />} />
                </Routes>
              </SharkShell>
            </ModalsProvider>
          </SpotlightProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </BrowserRouter>
  );
}
