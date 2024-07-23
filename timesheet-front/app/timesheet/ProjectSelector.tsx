"use client";
import { Flex, Radio, Select, Text, TextArea } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { ProjectContext } from "../providers/ProjectProvider";

interface Props {
  radioType: string;
  setRadioType: (value: string) => void;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  task: string;
  setTask: (value: string) => void;
  // setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectSelector = ({
  radioType,
  setRadioType,
  selectedProject,
  setSelectedProject,
  task,
  setTask,
}: Props) => {
  const { projects } = React.useContext(ProjectContext);
  let optionArr = projects.filter((project) => project.type === radioType);

  const handleRadioChange = (option: string) => {
    setRadioType(option);
    setSelectedProject("");
    setTask("");
    optionArr = projects.filter((project) => project.type === radioType);
  };
  const valueNameMap = optionArr.reduce<{ [key: string]: string }>(
    (acc, project) => {
      acc[project._id.toString()] = project.name;
      return acc;
    },
    {}
  );
  const handleProjectChange = (value: string) => {
    const projectName = valueNameMap[value];
    setSelectedProject(projectName);
  };

  return (
    <>
      <Flex align="center" pt="2" pb="3" gap="5">
        <Flex asChild gap="2">
          <Text size="2" as="label">
            <Radio
              size="3"
              name="project-radio"
              value="project"
              // defaultChecked
              checked={radioType == "project"}
              onChange={() => handleRadioChange("project")}
            />
            project
          </Text>
        </Flex>
        <Flex asChild gap="2">
          <Text size="2" as="label">
            <Radio
              size="3"
              name="project-radio"
              value="non-project"
              checked={radioType == "non-project"}
              onChange={() => handleRadioChange("non-project")}
            />
            non-project
          </Text>
        </Flex>
      </Flex>

      <Select.Root
        onValueChange={handleProjectChange}
        key={radioType}
        value={selectedProject}
      >
        <Select.Trigger
          placeholder={
            radioType == "project" ? "select project" : "select non-project"
          }
          // value={selectedProject}
        >
          {selectedProject}
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item disabled value=" ">
              {radioType == "project" ? "select project" : "select pon-project"}
            </Select.Item>
            {optionArr.map((project) => (
              <Select.Item value={project._id.toString()} key={project._id}>
                {project.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <TextArea
        mt="2"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        radius="none"
        placeholder="task details…"
      />
    </>
  );
};

export default ProjectSelector;
