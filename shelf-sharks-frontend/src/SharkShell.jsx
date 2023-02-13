import { useState } from "react";
import {
  AppShell,
  Footer,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";

import SharkNavbar from "./SharkNavbar";
import SharkHeader from "./SharkHeader";

export default function SharkShell(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<SharkNavbar opened={opened} />}
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <SharkHeader
          colorScheme={props.colorScheme}
          toggleColorScheme={props.toggleColorScheme}
          setOpened={setOpened}
          opened={opened}
        />
      }
    >
      {props.children}
    </AppShell>
  );
}
