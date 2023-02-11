import {
  Group,
  Anchor,
  Header,
  Burger,
  Title,
  Text,
  ActionIcon,
  MediaQuery,
  useMantineTheme,
  Button,
  Kbd,
  Badge,
} from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";

import { IconSearch } from "@tabler/icons";

export default function SharkHeader(props) {
  const theme = useMantineTheme();
  const spotlight = useSpotlight();

  return (
    <Header height={{ base: 70, md: 70 }} p="md">
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.opened}
            onClick={() => props.setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Anchor href="/" variant="text">
          <Title order={2} sx={{ fontFamily: "Carter One" }}>
            Shelf Sharks
          </Title>
        </Anchor>

        {/* Spotlight search for desktops */}
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Button variant="default" onClick={() => spotlight.openSpotlight()}>
            <Group>
              <IconSearch />
              <Text>Search...</Text>
              <Group>
                <Badge radius="sm" color="dark">
                  Ctrl + Space
                </Badge>
              </Group>
            </Group>
          </Button>
        </MediaQuery>

        {/* Spotlight search for mobile devices */}
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <ActionIcon size="xl" onClick={() => spotlight.openSpotlight()}>
            <IconSearch />
          </ActionIcon>
        </MediaQuery>
      </Group>
    </Header>
  );
}
