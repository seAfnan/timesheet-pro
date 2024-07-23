"use client";
import { Box, Button, Flex, Grid, Section, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import useWeekStore from "../store/weekStore";

const TopControls = () => {
  const {
    week,
    defautlWeek,
    weeksInYear,
    weekIncrement,
    weekDecrement,
    weekReset,
    weekRecord,
  } = useWeekStore();

  return (
    <Grid columns="3" width="auto">
      <Box>
        <Button
          radius="none"
          title="Reset Week"
          variant="surface"
          onClick={() => weekReset()}
        >
          <BiReset />
        </Button>
      </Box>
      <Box style={{ textAlign: "center" }}>
        <Button
          radius="none"
          variant="soft"
          disabled={week <= 1}
          onClick={() => weekDecrement()}
        >
          <AiOutlineArrowLeft />
          week {week - 1}
        </Button>
        <Button radius="none" variant="solid" disabled>
          week {week}
        </Button>
        {week + 1 <= weeksInYear && (
          <Button
            radius="none"
            variant="soft"
            disabled={week > defautlWeek}
            onClick={() => weekIncrement()}
          >
            week {week + 1}
            <AiOutlineArrowRight />
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default TopControls;
