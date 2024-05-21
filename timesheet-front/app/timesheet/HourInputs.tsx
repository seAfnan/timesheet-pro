"use client";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";

type ValueType = {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  project: string;
  type: string;
};

const HourInputs = () => {
  const [values, setValues] = useState({
    field1: "0",
    field2: "0",
    field3: "0",
    field4: "0",
    field5: "0",
    field6: "0",
    field7: "0",
  });
  const [projectHours, setProjectHours] = useState<ValueType[]>([]);

  // Handler function to add the form values to an array
  const handleAdd = () => {
    const newItem = {
      field1: values.field1 || "0",
      field2: values.field2 || "0",
      field3: values.field3 || "0",
      field4: values.field4 || "0",
      field5: values.field5 || "0",
      field6: values.field6 || "0",
      field7: values.field7 || "0",
      project: true, // or false depending on project/non-project selection
    };

    // Add the new item to the array
    // Replace `arrayName` with the actual name of your array
    // setProjectHours((prevArray) => [...prevArray, newItem]);
    console.log(projectHours);

    // Reset the form values
    setValues({
      field1: "0",
      field2: "0",
      field3: "0",
      field4: "0",
      field5: "0",
      field6: "0",
      field7: "0",
    });
  };

  // Handler function to update the value of a specific field
  const handleChange =
    (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = event.target.value;

      // Remove leading zeros
      inputValue = inputValue.replace(/^0+/, "");

      // Check if the input value is a valid number and greater than or equal to 0, or if it's an empty string
      if (
        inputValue === "" ||
        (!isNaN(parseInt(inputValue)) && parseFloat(inputValue) >= 0)
      ) {
        setValues((prevValues) => ({
          ...prevValues,
          [fieldName]: inputValue,
        }));
      }
    };

  return (
    <>
      <Flex direction="row" gap="1">
        <Flex direction="column" align="center">
          <Text size="2">Mon</Text>
          <Text color="indigo" size="2">
            25-03-2024
          </Text>
          <TextField.Root
            style={{ textAlign: "center" }}
            value={values.field1}
            onChange={handleChange("field1")}
            radius="none"
            placeholder="Mon hr."
          />
        </Flex>
        <Flex direction="column" align="center">
          <Text size="2">Tue</Text>
          <Text color="indigo" size="2">
            26-03-2024
          </Text>
          <TextField.Root
            style={{ textAlign: "center" }}
            value={values.field2}
            onChange={handleChange("field2")}
            radius="none"
            placeholder="Tue hr."
          />
        </Flex>
        <Flex direction="column" align="center">
          <Text size="2">Wed</Text>
          <Text color="indigo" size="2">
            27-03-2024
          </Text>
          <TextField.Root
            style={{ textAlign: "center" }}
            value={values.field3}
            onChange={handleChange("field3")}
            radius="none"
            placeholder="Wed hr."
          />
        </Flex>
        <Flex direction="column" align="center">
          <Text size="2">Thu</Text>
          <Text color="indigo" size="2">
            28-03-2024
          </Text>
          <TextField.Root
            style={{ textAlign: "center" }}
            value={values.field4}
            onChange={handleChange("field4")}
            radius="none"
            placeholder="Thu hr."
          />
        </Flex>
        <Flex direction="column" align="center">
          <Text size="2">Fri</Text>
          <Text color="indigo" size="2">
            29-03-2024
          </Text>
          <TextField.Root
            style={{ textAlign: "center" }}
            value={values.field5}
            onChange={handleChange("field5")}
            radius="none"
            placeholder="Fri hr."
          />
        </Flex>
        <Flex direction="column" align="center">
          <Text size="2">Sat</Text>
          <Text color="indigo" size="2">
            01-04-2024
          </Text>
          <TextField.Root
            style={{ textAlign: "center" }}
            value={values.field6}
            onChange={handleChange("field6")}
            radius="none"
            placeholder="Sat hr."
          />
        </Flex>
        <Flex direction="column" align="center">
          <Text size="2">Sun</Text>
          <Text color="indigo" size="2">
            02-04-2024
          </Text>
          <TextField.Root
            style={{ textAlign: "center" }}
            value={values.field7}
            onChange={handleChange("field7")}
            radius="none"
            placeholder="Sun hr."
          />
        </Flex>
        <Flex direction="column" align="center">
          <Button
            style={{ marginTop: "39.5px" }}
            radius="none"
            variant="solid"
            onClick={handleAdd}
          >
            Add
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default HourInputs;
