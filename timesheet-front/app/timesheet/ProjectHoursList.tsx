import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  TextField,
  Container,
  Heading,
  TextArea,
} from "@radix-ui/themes";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  projectHours: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
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
                value={item.monday}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.tuesday}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.wednesday}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.thursday}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.friday}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center" }}
                value={item.saturday}
                radius="none"
                disabled
              />
              <TextField.Root
                style={{ textAlign: "center", border: "none" }}
                value={item.sunday}
                radius="none"
                disabled
              />
              <Button
                variant={editIndex === index ? "solid" : "soft"}
                style={{
                  fontSize: "12px",
                  paddingLeft: "7px",
                  paddingRight: "6px",
                  marginRight: "-4px",
                }}
                title="Edit"
                onClick={() => handleEdit(index)}
              >
                <AiFillEdit />
              </Button>
              <Button
                variant={editIndex === index ? "solid" : "soft"}
                style={{
                  fontSize: "12px",
                  paddingLeft: "6px",
                  paddingRight: "7px",
                }}
                title="Remove"
                onClick={() => handleRemove(index)}
              >
                <FaTrash />
              </Button>
            </Flex>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default ProjectHoursList;
