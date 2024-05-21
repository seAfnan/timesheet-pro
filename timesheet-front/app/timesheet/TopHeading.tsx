"use client";
import { Box, Container, Text } from "@radix-ui/themes";
import React from "react";

const TopHeading = () => {
  return (
    <Container size="1">
      <Box
        py="2"
        style={{
          textAlign: "center",
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Text>WEEK 6</Text>
      </Box>
    </Container>
  );
};

export default TopHeading;
