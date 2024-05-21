"use client";
import { Flex, Radio, Select, Text, TextArea } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { ProjectContext } from "../contexts/ProjectProvider";

const ProjectSelector = () => {
  const [radioType, setRadioType] = useState("project");
  const { projects } = React.useContext(ProjectContext);

  const [defaultOption, setDefaultOption] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  let optionArr = projects.filter((project) => project.type === radioType);

  const handleRadioChange = (option: string) => {
    setRadioType(option);
    setDefaultOption("");
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
              defaultChecked
              onChange={() => handleRadioChange("project")}
            />
            Project
          </Text>
        </Flex>
        <Flex asChild gap="2">
          <Text size="2" as="label">
            <Radio
              size="3"
              name="project-radio"
              value="non-project"
              onChange={() => handleRadioChange("non-project")}
            />
            Non-project
          </Text>
        </Flex>
      </Flex>

      <Select.Root onValueChange={handleProjectChange} key={radioType}>
        <Select.Trigger
          placeholder={
            radioType == "project" ? "Select Project" : "Select Non-Project"
          }
          value={defaultOption}
        />
        <Select.Content>
          <Select.Group>
            <Select.Item disabled value=" ">
              {radioType == "project" ? "Select Project" : "Select Non-Project"}
            </Select.Item>
            {optionArr.map((project) => (
              <Select.Item value={project._id.toString()} key={project._id}>
                {project.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <TextArea mt="2" radius="none" placeholder="Task details…" />
    </>
  );
};

export default ProjectSelector;
