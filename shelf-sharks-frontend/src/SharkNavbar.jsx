import { Navbar, Text, NavLink, Title, ScrollArea, Space } from "@mantine/core";
import {
  IconBookUpload,
  IconBookDownload,
  IconUser,
  IconDatabaseImport,
} from "@tabler/icons";

export default function SharkNavbar(props) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section>
        <Title order={3}>Librarian</Title>
        <Space h="md" />
        <NavLink
          sx={{
            borderRadius: 6,
          }}
          label="Check-in Books"
          description="12 waiting for check-in"
          icon={<IconBookDownload color="lightGreen" />}
        />
        <Space h="sm" />
        <NavLink
          sx={{
            borderRadius: 6,
          }}
          label="Check-out Books"
          description="34 books on hold"
          icon={<IconBookUpload color="orange" />}
        />
      </Navbar.Section>
      <Navbar.Section>
        <Title order={3}>Admin</Title>
        <Space h="md" />
        <NavLink
          sx={{
            borderRadius: 6,
          }}
          label="Manage Users"
          description="133 registered users"
          icon={<IconUser color="lightBlue" />}
        />
        <Space h="sm" />
        <NavLink
          sx={{
            borderRadius: 6,
          }}
          label="Add Books"
          description="432 books in database"
          icon={<IconDatabaseImport />}
        />
      </Navbar.Section>
    </Navbar>
  );
}
