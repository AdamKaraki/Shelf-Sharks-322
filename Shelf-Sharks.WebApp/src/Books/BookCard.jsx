import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  List,
  Center,
  ThemeIcon,
  useMantineTheme,
  Stack,
  MediaQuery,
} from "@mantine/core";
import { IconBookDownload, IconBookUpload, IconUser } from "@tabler/icons";

export default function BookCard(props) {
  const theme = useMantineTheme();
  return (
    <MediaQuery smallerThan="lg" styles={{ maxWidth: "inherit" }}>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        miw={300}
        maw={250}
        sx={{ flex: 1 }}
        withBorder
      >
        <Card.Section
          sx={{
            backgroundColor: theme.backgroundColor,
          }}
        >
          <Center>
            <Image
              src="https://m.media-amazon.com/images/I/41LmPEurOOL.jpg"
              width={100}
              alt="Dune"
            />
          </Center>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Dune</Text>
          {props.numAvailable > 0 ? (
            <Badge color="green" variant="light">
              Available ({props.numAvailable})
            </Badge>
          ) : (
            <Badge color="red" variant="light">
              Checked Out
            </Badge>
          )}
        </Group>

        {props.checkedOut === false ? (
          <Text size="sm" color="dimmed">
            Dune is a 1965 epic science fiction novel by American author Frank
            Herbert, originally published as two separate serials in Analog
            magazine.
          </Text>
        ) : (
          <></>
        )}

        {props.checkedOut ? (
          <>
            <List>
              <List.Item
                icon={
                  <ThemeIcon color="orange" size={24} radius="xl">
                    <IconBookUpload size={16} />
                  </ThemeIcon>
                }
              >
                <Text>
                  Date checked out:{" "}
                  <b>{props.checkedOutDate.toLocaleDateString()}</b>
                </Text>{" "}
              </List.Item>

              <List.Item
                icon={
                  <ThemeIcon color="green" size={24} radius="xl">
                    <IconBookDownload size={16} />
                  </ThemeIcon>
                }
              >
                <Text>
                  Date to return: <b>{props.returnDate.toLocaleDateString()}</b>
                </Text>{" "}
              </List.Item>

              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconUser size={16} />
                  </ThemeIcon>
                }
              >
                <Text>
                  Cardholder: <b>Nathan Laha</b>
                </Text>
              </List.Item>
            </List>
            <Button.Group>
              <Button
                variant="light"
                color="green"
                fullWidth
                mt="md"
                radius="md"
              >
                Check In
              </Button>
              <Button variant="light" color="red" fullWidth mt="md" radius="md">
                Missing
              </Button>
            </Button.Group>
          </>
        ) : (
          <Button.Group>
            <Button variant="light" color="red" fullWidth mt="md" radius="md">
              Check Out
            </Button>
            <Button
              variant="light"
              color="yellow"
              fullWidth
              mt="md"
              radius="md"
            >
              Hold
            </Button>
          </Button.Group>
        )}
      </Card>
    </MediaQuery>
  );
}
