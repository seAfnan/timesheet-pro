import { Box, Button, Flex, Grid, Section, Text } from "@radix-ui/themes";
import React from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const TopControls = () => {
  return (
    <Grid columns="3" width="auto">
      <Box>
        <Button radius="none" variant="soft">
          Last Week
        </Button>
        <Button radius="none" variant="solid">
          This Week
        </Button>
      </Box>
      <Box style={{ textAlign: "center" }}>
        <Button radius="none" variant="soft">
          <AiOutlineArrowLeft />
          Week 5
        </Button>
        <Button radius="none" variant="solid">
          Week 6
        </Button>
        <Button radius="none" variant="soft">
          Week 7
          <AiOutlineArrowRight />
        </Button>
      </Box>
    </Grid>
  );
};

export default TopControls;
