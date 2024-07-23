"use client";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Flex,
  Select,
  Table,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { z } from "zod";
import AxiosErrorMessage from "../components/AxiosErrorMessage";
import ErrorMessage from "../components/ErrorMessage";
import { BACKEND_URL } from "../lib/Constants";
import { projectSchema } from "../ValidationSchemas";
import { ProjectContext } from "../providers/ProjectProvider";
import { Project } from "../providers/ProjectProvider";

type ProjectFormData = z.infer<typeof projectSchema>;

const Page = () => {
  const { status, data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);
  const [selectValue, setSelectValue] = useState("project");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { projects, fetchProjects } = useContext(ProjectContext);
  const {
    register,
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const handleProjectSubmit = async (data: ProjectFormData) => {
    try {
      setSubmitting(true);
      let message = data.type == "project" ? "Project" : "Non-project";
      if (editingProject) {
        await axios.patch(
          BACKEND_URL + "/project/" + editingProject._id,
          data,
          {
            headers: {
              Authorization: `Bearer ${session?.backendToken.accessKey}`,
            },
          }
        );
        message = message + " updated successfully.";
        setShowForm(false);
      } else {
        await axios.post(BACKEND_URL + "/project/create", data, {
          headers: {
            Authorization: `Bearer ${session?.backendToken.accessKey}`,
          },
        });
        message = message + " created successfully.";
      }
      toast.success(message);
      fetchProjects();
      setSubmitting(false);
      setEditingProject(null);
      resetForm({
        name: "",
        description: "",
        type: "project",
      });
      setSelectValue("");
    } catch (error) {
      setSubmitting(false);
      setAxiosError(error as AxiosError);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await axios.get(BACKEND_URL + "/project/" + id, {
        headers: { Authorization: `Bearer ${session?.backendToken.accessKey}` },
      });
      setShowForm(true);
      setTimeout(() => {
        setEditingProject(response.data);
      }, 100);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setAxiosError(error as AxiosError);
    }
  };

  useEffect(() => {
    if (editingProject) {
      resetForm({
        name: editingProject.name,
        description: editingProject.description,
        type: editingProject.type,
      });
      setSelectValue(editingProject.type);
    }
  }, [editingProject]);

  useEffect(() => {
    if (showForm) {
      setEditingProject(null);
      setSelectValue("project");
      resetForm({
        name: "",
        description: "",
        type: "project",
      });
    }
  }, [showForm]);

  return (
    <div>
      <Box>
        {axiosError && <AxiosErrorMessage error={axiosError} />}
        <Toaster />
        <Button
          style={{ float: "right" }}
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {showForm ? "- Add New" : "+ Add New"}
        </Button>
      </Box>

      {showForm && (
        <form onSubmit={handleSubmit(handleProjectSubmit)}>
          <Box
            pt="2"
            pb="3"
            style={{
              background: "var(--gray-a2)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Container size="2">
              <Flex direction="column">
                <Flex mt="1">
                  <Text style={{ width: "20%" }} mt="1">
                    Type
                  </Text>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select.Root
                        value={selectValue}
                        onValueChange={(value: string) => {
                          field.onChange(value);
                          setSelectValue(value);
                        }}
                      >
                        <Select.Trigger
                          style={{ width: "70%" }}
                          placeholder="Select"
                        />
                        <Select.Content>
                          <Select.Group>
                            <Select.Item value="project">Project</Select.Item>
                            <Select.Item value="non-project">
                              Non-project
                            </Select.Item>
                          </Select.Group>
                        </Select.Content>
                      </Select.Root>
                    )}
                  />
                </Flex>
                <ErrorMessage>{errors.type?.message}</ErrorMessage>
                <Flex mt="2">
                  <Text style={{ width: "20%" }} mt="1">
                    Name
                  </Text>
                  <TextField.Root
                    style={{ width: "70%" }}
                    radius="none"
                    placeholder="Name"
                    {...register("name")}
                    disabled={editingProject ? true : false}
                  />
                </Flex>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                <Flex mt="2">
                  <Text style={{ width: "20%" }} mt="2">
                    Description
                  </Text>
                  <TextArea
                    style={{ width: "70%" }}
                    radius="none"
                    placeholder="Description..."
                    {...register("description")}
                  />
                </Flex>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Box
                  mt="4"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Button disabled={isSubmitting}>
                    {editingProject ? "Update" : "Create"}
                    {isSubmitting && <Spinner />}
                  </Button>
                </Box>
              </Flex>
            </Container>
          </Box>
        </form>
      )}

      {projects.length == 0 && !axiosError && (
        <Box
          style={{
            background: "var(--gray-a2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          <Container style={{ textAlign: "center" }} size="3">
            <Spinner />
          </Container>
        </Box>
      )}

      {projects.length > 0 && (
        <Box
          style={{
            borderRadius: "var(--radius-3)",
          }}
        >
          <Container size="3">
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell align="center">
                    Project
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center">
                    Description
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center">
                    Type
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center">
                    Action
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {projects.map((project) => (
                  <Table.Row key={project._id}>
                    <Table.RowHeaderCell align="center">
                      {project.name}
                    </Table.RowHeaderCell>
                    <Table.Cell align="center">
                      {project.description}
                    </Table.Cell>
                    <Table.Cell align="center">{project.type}</Table.Cell>
                    <Table.Cell align="center">
                      <Button onClick={() => handleEdit(project._id)}>
                        <AiFillEdit />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default Page;
