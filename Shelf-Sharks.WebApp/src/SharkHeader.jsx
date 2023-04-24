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
  useMantineColorScheme,
  Button,
  Kbd,
  Badge,
} from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import { useNavigate } from "react-router-dom";

import { IconSearch, IconSun, IconMoonStars } from "@tabler/icons";

export default function SharkHeader(props) {
  const theme = useMantineTheme();
  const spotlight = useSpotlight();
  const navigate = useNavigate();

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

        <Anchor
          onClick={() => {
            navigate(`/`);
          }}
          variant="text"
        >
          <Title order={2} sx={{ fontFamily: "Carter One" }}>
            Shelf Sharks
          </Title>
        </Anchor>

        <Group>
          <ActionIcon
            size="xl"
            title="Toggle color scheme"
            onClick={() => props.toggleColorScheme()}
          >
            {props.colorScheme == "light" ? <IconSun /> : <IconMoonStars />}
          </ActionIcon>

          {/* Spotlight search for desktops */}
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Button
              title="Search library..."
              variant="default"
              onClick={() => spotlight.openSpotlight()}
            >
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
            <ActionIcon
              title="Search library..."
              size="xl"
              onClick={() => spotlight.openSpotlight()}
            >
              <IconSearch />
            </ActionIcon>
          </MediaQuery>
        </Group>
      </Group>
    </Header>
  );
}
