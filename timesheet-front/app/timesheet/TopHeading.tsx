"use client";
import { Box, Container, Text } from "@radix-ui/themes";
import React from "react";
import useWeekStore from "../store/weekStore";

const TopHeading = () => {
  const { week, year } = useWeekStore();
  return (
    <Container size="1">
      <Box
        py="2"
        style={{
          textAlign: "center",
          // background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Text>
          w {week}, {year}
        </Text>
      </Box>
    </Container>
  );
};

export default TopHeading;
