import { MantineProvider, ColorSchemeProvider, Text } from "@mantine/core";
import Shell from "./Shell";

export default function App() {
  return (
    <ColorSchemeProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <Shell>
          <Text>List of recently checked out books</Text>
        </Shell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
