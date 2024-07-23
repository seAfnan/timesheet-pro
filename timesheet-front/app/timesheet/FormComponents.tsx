"use client";
import {
  Box,
  Grid,
  Text,
  Flex,
  Button,
  TextField,
  TextArea,
  Heading,
} from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import ProjectSelector from "./ProjectSelector";
import useWeekStore from "../store/weekStore";
import toast, { Toaster } from "react-hot-toast";
import ProjectHoursList from "./ProjectHoursList";
import { BsSave } from "react-icons/bs";
import { WeekHourContext } from "../providers/WeekHourProvider";
import Spinner from "../components/Spinner";
import axios from "axios";
import { BACKEND_URL } from "../lib/Constants";
import { useSession } from "next-auth/react";

const FormComponents = () => {
  const { status, data: session } = useSession();
  const { weekRecord, updateWeekRecord, datesOfWeek, week } = useWeekStore();
  const [radioType, setRadioType] = useState("project");
  const [selectedProject, setSelectedProject] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [values, setValues] = useState({
    mondayInp: 0,
    mondayComment: "",
    tuesdayInp: 0,
    tuesdayComment: "",
    wednesdayInp: 0,
    wednesdayComment: "",
    thursdayInp: 0,
    thursdayComment: "",
    fridayInp: 0,
    fridayComment: "",
    saturdayInp: 0,
    saturdayComment: "",
    sundayInp: 0,
    sundayComment: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addButtonText, setAddButtonText] = useState("add");
  const { weekHours } = useContext(WeekHourContext);
  const [submitting, setSubmitting] = useState(false);

  const daysOfWeek = [
    { label: "mon", date: datesOfWeek[0], key: "mondayInp" },
    { label: "tue", date: datesOfWeek[1], key: "tuesdayInp" },
    { label: "wed", date: datesOfWeek[2], key: "wednesdayInp" },
    { label: "thu", date: datesOfWeek[3], key: "thursdayInp" },
    { label: "fri", date: datesOfWeek[4], key: "fridayInp" },
    { label: "sat", date: datesOfWeek[5], key: "saturdayInp" },
    { label: "sun", date: datesOfWeek[6], key: "sundayInp" },
  ];

  const calculateCommittedHours = (
    details: { [key: string]: number | string }[]
  ) => {
    return details.reduce((total, item) => {
      const monday = Number(item.monday) || 0;
      const tuesday = Number(item.tuesday) || 0;
      const wednesday = Number(item.wednesday) || 0;
      const thursday = Number(item.thursday) || 0;
      const friday = Number(item.friday) || 0;
      const saturday = Number(item.saturday) || 0;
      const sunday = Number(item.sunday) || 0;

      return (
        total +
        monday +
        tuesday +
        wednesday +
        thursday +
        friday +
        saturday +
        sunday
      );
    }, 0);
  };

  useEffect(() => {
    const committedHour = calculateCommittedHours(weekRecord.details);
    updateWeekRecord("committedHours", committedHour);
    updateWeekRecord(
      "overtime",
      Number(committedHour) - Number(weekHours[week]?.hours) < 0
        ? 0
        : Number(committedHour) - Number(weekHours[week]?.hours)
    );
  }, [weekRecord.details]);

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
      monday: parseNumber(values.mondayInp) || 0,
      tuesday: parseNumber(values.tuesdayInp) || 0,
      wednesday: parseNumber(values.wednesdayInp) || 0,
      thursday: parseNumber(values.thursdayInp) || 0,
      friday: parseNumber(values.fridayInp) || 0,
      saturday: parseNumber(values.saturdayInp) || 0,
      sunday: parseNumber(values.sundayInp) || 0,
      projectType: radioType,
      project: selectedProject,
      task: taskDetail,
    };

    let newArray;
    if (editIndex !== null) {
      newArray = [...weekRecord.details];
      newArray[editIndex] = newItem;
      setEditIndex(null);
    } else {
      newArray = [...weekRecord.details, newItem];
    }
    updateWeekRecord("details", newArray);

    // Reset the form values
    setValues({
      mondayInp: 0,
      mondayComment: "",
      tuesdayInp: 0,
      tuesdayComment: "",
      wednesdayInp: 0,
      wednesdayComment: "",
      thursdayInp: 0,
      thursdayComment: "",
      fridayInp: 0,
      fridayComment: "",
      saturdayInp: 0,
      saturdayComment: "",
      sundayInp: 0,
      sundayComment: "",
    });
    setTaskDetail("");
    setAddButtonText("add");
  };

  const handleRemove = (index: number) => {
    const newArray = weekRecord.details.filter(
      (_: any, i: number) => i !== index
    );
    updateWeekRecord("details", newArray);
  };

  const handleEdit = (index: number) => {
    const item = weekRecord.details[index];
    setValues({
      ...values,
      mondayInp: item.monday,
      tuesdayInp: item.tuesday,
      wednesdayInp: item.wednesday,
      thursdayInp: item.thursday,
      fridayInp: item.friday,
      saturdayInp: item.saturday,
      sundayInp: item.sunday,
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

  const handleSave = async () => {
    if (weekRecord.details.length == 0) {
      toast.error("Please add some hours");
      return;
    }
    let message = "Record ";
    setSubmitting(true);
    console.log(weekRecord.id);
    if (weekRecord.id) {
      await axios.patch(BACKEND_URL + "/record/" + weekRecord.id, weekRecord, {
        headers: {
          Authorization: `Bearer ${session?.backendToken.accessKey}`,
        },
      });
      message = message + " updated successfully.";
    } else {
      updateWeekRecord({
        employee: session?.user?.name,
        employeeEmail: session?.user?.email,
        mondayComment: values.mondayComment,
        tuesdayComment: values.tuesdayComment,
        wednesdayComment: values.wednesdayComment,
        thursdayComment: values.thursdayComment,
        fridayComment: values.fridayComment,
        saturdayComment: values.saturdayComment,
        sundayComment: values.sundayComment,
      });

      console.log(weekRecord);
      await axios.post(BACKEND_URL + "/record/create", weekRecord, {
        headers: {
          Authorization: `Bearer ${session?.backendToken.accessKey}`,
        },
      });
      message = message + " created successfully.";
    }
    toast.success(message);
    setSubmitting(false);
  };

  const clearComments = () => {
    setValues({
      ...values,
      mondayComment: "",
      tuesdayComment: "",
      wednesdayComment: "",
      thursdayComment: "",
      fridayComment: "",
      saturdayComment: "",
      sundayComment: "",
    });
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
                variant="soft"
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
          projectHours={weekRecord.details}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          editIndex={editIndex}
        />
      </Grid>

      {/* Comment boxes */}
      {weekRecord.details.length > 0 && (
        <Flex
          gap="2"
          p="2"
          mt="2"
          style={{
            // background: "var(--gray-a2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          <Box width="25%"></Box>
          <Box width="75%">
            <Flex direction="row" gap="1">
              {daysOfWeek.map((day) => (
                <Flex direction="column" align="center" key={day.key}>
                  <Text size="2">{day.label}</Text>
                  <Text color="indigo" size="2">
                    {day.date}
                  </Text>
                  <TextField.Root
                    style={{ textAlign: "center" }}
                    value={values[day.key]}
                    onChange={(e) => handleChange(day.key, e.target.value)}
                    radius="none"
                    placeholder={`${day.label} hr.`}
                  />
                </Flex>
              ))}
              <Flex direction="column" align="center">
                <Button
                  style={{ marginTop: "39.5px" }}
                  radius="none"
                  variant="soft"
                  color={addButtonText === "add" ? "indigo" : "orange"}
                  onClick={handleAdd}
                >
                  {addButtonText}
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      )}

      {/* Summary and save btn */}
      {weekRecord.details.length > 0 && (
        <Flex gap="1" pt="2" pb="2" style={{ textAlign: "center" }}>
          <Box
            width="25%"
            pt="2"
            pb="2"
            style={{
              background: "var(--gray-a2)",
              borderRadius: "var(--radius-3)",
            }}
          ></Box>
          <Box
            width="18.5%"
            pt="2"
            pb="2"
            ml="1"
            style={{
              background: "var(--gray-a2)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Heading size="3" mb="1" weight="light">
              hours required
            </Heading>
            <Text size="3" color="orange">
              {weekHours[week].hours}
            </Text>
          </Box>
          <Box
            width="18.5%"
            pt="2"
            pb="2"
            style={{
              background: "var(--gray-a2)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Heading size="3" mb="1" weight="light">
              hours committed
            </Heading>
            <Text size="3" color="orange">
              {weekRecord.committedHours}
            </Text>
          </Box>
          <Box
            width="18.5%"
            pt="2"
            pb="2"
            style={{
              background: "var(--gray-a2)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Heading size="3" mb="1" weight="light">
              overtime
            </Heading>
            <Text size="3" color="crimson">
              {weekRecord.overtime}
            </Text>
          </Box>
          <Box width="18.5%">
            <Button
              style={{ width: "100%", height: "98%", fontSize: "1.5rem" }}
              color="indigo"
              variant="solid"
              onClick={handleSave}
              disabled={submitting}
            >
              {submitting ? (
                <Spinner />
              ) : (
                <>
                  <BsSave style={{ marginRight: "0.5rem" }} />
                  save
                </>
              )}
            </Button>
          </Box>
          <Toaster />
        </Flex>
      )}
    </>
  );
};

export default FormComponents;
