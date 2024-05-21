import { Box, Grid, Text, Flex, Section } from "@radix-ui/themes";
import React, { useState } from "react";
import ProjectSelector from "./ProjectSelector";
import HourInputs from "./HourInputs";

const FormComponents = () => {
  // const [selectedRadio, setSelectedRadio] = useState("");
  // const [selectedDropdown, setSelectedDropdown] = useState("");
  return (
    <>
      <Flex
        gap="2"
        pt="3"
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Box width="25%">
          <Flex direction="column">
            <ProjectSelector
            // selectedRadio={selectedRadio}
            // setSelectedRadio={setSelectedRadio}
            // selectedDropdown={selectedDropdown}
            // setSelectedDropdown={setSelectedDropdown}
            />
          </Flex>
        </Box>
        <Box width="75%">
          <HourInputs
          // selectedRadio={selectedRadio}
          // selectedDropdown={selectedDropdown}
          />
        </Box>
      </Flex>

      <Grid>
        <Flex
          style={{
            background: "var(--gray-a2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          This is flex
        </Flex>
      </Grid>
    </>
  );
};

export default FormComponents;
