import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  TextField,
  Container,
  Heading,
} from "@radix-ui/themes";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  projectHours: {
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
  }[];
  handleRemove: (index: number) => void;
  handleEdit: (index: number) => void;
  editIndex: number | null;
};

const ProjectHoursList: React.FC<Props> = ({
  projectHours,
  handleRemove,
  handleEdit,
  editIndex,
}) => {
  const handleSave = () => {
    if (projectHours.length == 0) {
      toast.error("Please add some hours");
      return;
    }
  };

  return (
    <>
      {projectHours.map((item, index) => (
        <Flex
          key={index}
          gap="2"
          p="2"
          mt="2"
          style={{
            background: "var(--gray-a2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          <Box width="25%">
            <Flex direction="column">
              <Text size="3">
                {item.project}{" "}
                <Text
                  size="1"
                  color={item.projectType == "project" ? "orange" : "crimson"}
                  weight="regular"
                  as="span"
                >
                  {item.projectType}
                </Text>
              </Text>
              <Text size="2" color="cyan">
                {item.task}
              </Text>
            </Flex>
          </Box>
          <Box width="75%">
            <Flex direction="row" gap="1">
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.mondayInp}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.tuesdayInp}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.wednesdayInp}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.thursdayInp}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.fridayInp}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.saturdayInp}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.sundayInp}
                radius="none"
                disabled
              />
              <Button
                variant={editIndex === index ? "solid" : "outline"}
                onClick={() => handleEdit(index)}
              >
                <AiFillEdit />
              </Button>
              <Button
                variant="solid"
                color="red"
                onClick={() => handleRemove(index)}
              >
                <FaTrash />
              </Button>
            </Flex>
          </Box>
        </Flex>
      ))}
      {projectHours.length > 0 && (
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
              37
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
              40
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
              3
            </Text>
          </Box>
          <Box width="18.5%">
            <Button
              style={{ width: "100%", height: "98%", fontSize: "1.5rem" }}
              color="indigo"
              variant="solid"
              onClick={handleSave}
            >
              <BsSave style={{ marginRight: "0.5rem" }} />
              save
            </Button>
          </Box>
          <Toaster />
        </Flex>
      )}
    </>
  );
};

export default ProjectHoursList;
