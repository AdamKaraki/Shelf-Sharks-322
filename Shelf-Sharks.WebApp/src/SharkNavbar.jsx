import { Navbar, Text, NavLink, Title, ScrollArea, Space } from "@mantine/core";
import {
  IconBookUpload,
  IconBookDownload,
  IconDatabaseImport,
  IconTrash,
} from "@tabler/icons";
import { useState, useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";

export default function SharkNavbar(props) {
  const [booksCheckedOut, setBooksCheckedOut] = useState(0);
  const [numBooks, setNumBooks] = useState(0);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getBooksCheckedOut = async () => {
      const response = await fetch(`${apiURL}/stats/num_checked_out`);
      const data = await response.text();
      setBooksCheckedOut(data);
    };
    getBooksCheckedOut();

    const getNumBooks = async () => {
      const response = await fetch(`${apiURL}/stats/num_books`);
      const data = await response.text();
      setNumBooks(data);
    };
    getNumBooks();
  }, []);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section mb="md">
        <Title order={3}>Librarian</Title>
        <Space h="md" />
        <Link to="/check-in" style={{ textDecoration: "none" }}>
          <NavLink
            sx={{
              borderRadius: 6,
            }}
            label="Check-in Books"
            description={`Books out: ${booksCheckedOut}`}
            icon={<IconBookDownload color="lightGreen" />}
          />
        </Link>
        <Space h="sm" />
        <Link to="/check-out" style={{ textDecoration: "none" }}>
          <NavLink
            sx={{
              borderRadius: 6,
            }}
            label="Check-out Books"
            icon={<IconBookUpload color="orange" />}
          />
        </Link>
      </Navbar.Section>
      <Navbar.Section>
        <Title order={3}>Admin</Title>
        <Space h="md" />
        <Link to="/remove-books" style={{ textDecoration: "none" }}>
          <NavLink
            sx={{
              borderRadius: 6,
            }}
            label="Remove Books"
            icon={<IconTrash color="red" />}
          />
        </Link>
        <Space h="sm" />
        <Link to="/add-books" style={{ textDecoration: "none" }}>
          <NavLink
            sx={{
              borderRadius: 6,
            }}
            label="Add Books"
            description={`${numBooks} book(s) in database`}
            icon={<IconDatabaseImport color="lightBlue" />}
          />
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
