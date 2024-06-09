"use client";
import { Box, Grid, Text, Flex, Button, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ProjectSelector from "./ProjectSelector";
import useWeekStore from "../store/weekStore";
import toast, { Toaster } from "react-hot-toast";
import ProjectHoursList from "./ProjectHoursList";
// import HourInputs from "./HourInputs";

type ValueType = {
  mondayInp: number;
  tuesdayInp: number;
  wednesdayInp: number;
  thursdayInp: number;
  fridayInp: number;
  saturdayInp: number;
  sundayInp: number;
  projectType: string;
  project: string;
  task: string;
};

const FormComponents = () => {
  const [radioType, setRadioType] = useState("project");
  const [selectedProject, setSelectedProject] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [values, setValues] = useState({
    mondayInp: 0,
    tuesdayInp: 0,
    wednesdayInp: 0,
    thursdayInp: 0,
    fridayInp: 0,
    saturdayInp: 0,
    sundayInp: 0,
  });
  const [projectHours, setProjectHours] = useState<ValueType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { datesOfWeek } = useWeekStore();
  const [addButtonText, setAddButtonText] = useState("add");

  function parseNumber(value: string | number): number {
    const parsedValue = parseFloat(value as string);
    return Number.isInteger(parsedValue)
      ? parseInt(value as string, 10)
      : parsedValue;
  }

  // Handler function to add the form values to an array
  const handleAdd = () => {
    if (selectedProject === "") {
      toast.error("Please select a project");
      return;
    }
    const newItem = {
      mondayInp: parseNumber(values.mondayInp) || 0,
      tuesdayInp: parseNumber(values.tuesdayInp) || 0,
      wednesdayInp: parseNumber(values.wednesdayInp) || 0,
      thursdayInp: parseNumber(values.thursdayInp) || 0,
      fridayInp: parseNumber(values.fridayInp) || 0,
      saturdayInp: parseNumber(values.saturdayInp) || 0,
      sundayInp: parseNumber(values.sundayInp) || 0,
      projectType: radioType,
      project: selectedProject,
      task: taskDetail,
    };

    if (editIndex !== null) {
      setProjectHours((prevArray) => {
        const newArray = [...prevArray];
        newArray[editIndex] = newItem;
        return newArray;
      });
      setEditIndex(null);
    } else {
      setProjectHours((prevArray) => [...prevArray, newItem]);
    }

    // Reset the form values
    setValues({
      mondayInp: 0,
      tuesdayInp: 0,
      wednesdayInp: 0,
      thursdayInp: 0,
      fridayInp: 0,
      saturdayInp: 0,
      sundayInp: 0,
    });
    setTaskDetail("");
    setAddButtonText("add");
  };
  useEffect(() => {
    console.log(projectHours);
  }, [projectHours]);

  const handleRemove = (index: number) => {
    setProjectHours((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const item = projectHours[index];
    setValues({
      // ...values,
      mondayInp: item.mondayInp,
      tuesdayInp: item.tuesdayInp,
      wednesdayInp: item.wednesdayInp,
      thursdayInp: item.thursdayInp,
      fridayInp: item.fridayInp,
      saturdayInp: item.saturdayInp,
      sundayInp: item.sundayInp,
    });
    setRadioType(item.projectType);
    setSelectedProject(item.project);
    setTaskDetail(item.task);
    setEditIndex(index);
    setAddButtonText("update");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <Flex
        gap="2"
        p="2"
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Toaster />
        <Box width="25%">
          <Flex direction="column">
            <ProjectSelector
              radioType={radioType}
              setRadioType={setRadioType}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              task={taskDetail}
              setTask={setTaskDetail}
            />
          </Flex>
        </Box>
        <Box width="75%">
          {/* <HourInputs
          // selectedRadio={selectedRadio}
          // selectedDropdown={selectedDropdown}
          /> */}
          <Flex direction="row" gap="1">
            <Flex direction="column" align="center">
              <Text size="2">mon</Text>
              <Text color="indigo" size="2">
                {datesOfWeek[0]}
              </Text>
              <TextField.Root
                style={{ textAlign: "center" }}
                value={values.mondayInp}
                onChange={handleChange("mondayInp")}
                radius="none"
                placeholder="mon hr."
              />
            </Flex>
            <Flex direction="column" align="center">
              <Text size="2">tue</Text>
              <Text color="indigo" size="2">
                {datesOfWeek[1]}
              </Text>
              <TextField.Root
                style={{ textAlign: "center" }}
                value={values.tuesdayInp}
                onChange={handleChange("tuesdayInp")}
                radius="none"
                placeholder="tue hr."
              />
            </Flex>
            <Flex direction="column" align="center">
              <Text size="2">wed</Text>
              <Text color="indigo" size="2">
                {datesOfWeek[2]}
              </Text>
              <TextField.Root
                style={{ textAlign: "center" }}
                value={values.wednesdayInp}
                onChange={handleChange("wednesdayInp")}
                radius="none"
                placeholder="wed hr."
              />
            </Flex>
            <Flex direction="column" align="center">
              <Text size="2">thu</Text>
              <Text color="indigo" size="2">
                {datesOfWeek[3]}
              </Text>
              <TextField.Root
                style={{ textAlign: "center" }}
                value={values.thursdayInp}
                onChange={handleChange("thursdayInp")}
                radius="none"
                placeholder="thu hr."
              />
            </Flex>
            <Flex direction="column" align="center">
              <Text size="2">fri</Text>
              <Text color="indigo" size="2">
                {datesOfWeek[4]}
              </Text>
              <TextField.Root
                style={{ textAlign: "center" }}
                value={values.fridayInp}
                onChange={handleChange("fridayInp")}
                radius="none"
                placeholder="fri hr."
              />
            </Flex>
            <Flex direction="column" align="center">
              <Text size="2">sat</Text>
              <Text color="indigo" size="2">
                {datesOfWeek[5]}
              </Text>
              <TextField.Root
                style={{ textAlign: "center" }}
                value={values.saturdayInp}
                onChange={handleChange("saturdayInp")}
                radius="none"
                placeholder="sat hr."
              />
            </Flex>
            <Flex direction="column" align="center">
              <Text size="2">sun</Text>
              <Text color="indigo" size="2">
                {datesOfWeek[6]}
              </Text>
              <TextField.Root
                style={{ textAlign: "center" }}
                value={values.sundayInp}
                onChange={handleChange("sundayInp")}
                radius="none"
                placeholder="sun hr."
              />
            </Flex>
            <Flex direction="column" align="center">
              <Button
                style={{ marginTop: "39.5px" }}
                radius="none"
                variant="solid"
                color={addButtonText === "add" ? "indigo" : "orange"}
                onClick={handleAdd}
              >
                {addButtonText}
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Grid>
        <ProjectHoursList
          projectHours={projectHours}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          editIndex={editIndex}
        />
      </Grid>
    </>
  );
};

export default FormComponents;
