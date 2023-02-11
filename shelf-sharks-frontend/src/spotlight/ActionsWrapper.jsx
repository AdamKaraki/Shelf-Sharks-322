import { Group, Text, Anchor, Pagination } from "@mantine/core";

export default function SharkActionsWrapper(props) {
  return (
    <div>
      {props.children}
      <Group
        position="apart"
        px={15}
        py="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        })}
      >
        <Group position="apart">
          <Text size="xs" color="dimmed">
            433 books found
          </Text>
          <Pagination size="xs" total={21} />
        </Group>
      </Group>
    </div>
  );
}
