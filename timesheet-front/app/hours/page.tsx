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
import { weekSchema } from "../ValidationSchemas";
import { WeekHourContext, WeekHours } from "../contexts/WeekHourProvider";
import useWeekStore from "../store/weekStore";

type WeekFormData = z.infer<typeof weekSchema>;

const Page = () => {
  const { status, data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);
  const [selectValue, setSelectValue] = useState("");
  const [editingWeekHours, setEditingWeekHours] = useState<WeekHours | null>(
    null
  );
  const { weekHours, fetchWeekHours } = useContext(WeekHourContext);
  const {
    register,
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<WeekFormData>({
    resolver: zodResolver(weekSchema),
  });
  const { weeksInYear } = useWeekStore();
  const weeks = Array.from({ length: weeksInYear }, (_, index) => index + 1);

  const handleProjectSubmit = async (data: WeekFormData) => {
    console.log(data);
    try {
      setSubmitting(true);
      let message = "";
      if (editingWeekHours) {
        await axios.patch(
          BACKEND_URL + "/hours/" + editingWeekHours._id,
          data,
          {
            headers: {
              Authorization: `Bearer ${session?.backendToken.accessKey}`,
            },
          }
        );
        message = "Week hours updated successfully.";
        setShowForm(false);
      } else {
        await axios.post(BACKEND_URL + "/hours", data, {
          headers: {
            Authorization: `Bearer ${session?.backendToken.accessKey}`,
          },
        });
        message = "Week hours created successfully.";
      }
      toast.success(message);
      fetchWeekHours();
      setSubmitting(false);
      setEditingWeekHours(null);
      // resetForm({
      //   week: "",
      //   hours: 0,
      // });
      // setSelectValue("");
    } catch (error) {
      setSubmitting(false);
      setAxiosError(error as AxiosError);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await axios.get(BACKEND_URL + "/hours/" + id, {
        headers: { Authorization: `Bearer ${session?.backendToken.accessKey}` },
      });
      setShowForm(true);
      setTimeout(() => {
        setEditingWeekHours(response.data);
      }, 100);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setAxiosError(error as AxiosError);
    }
  };

  useEffect(() => {
    if (editingWeekHours) {
      resetForm({
        week: editingWeekHours.week,
        hours: parseFloat(editingWeekHours.hours),
      });
    }
  }, [editingWeekHours]);

  useEffect(() => {
    if (showForm) {
      setEditingWeekHours(null);
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
                    Week
                  </Text>
                  <Controller
                    name="week"
                    control={control}
                    render={({ field }) => (
                      <Select.Root
                        value={selectValue}
                        onValueChange={(value: string) => {
                          field.onChange(value);
                          setSelectValue(value);
                        }}
                        disabled={editingWeekHours ? true : false}
                      >
                        <Select.Trigger
                          style={{ width: "70%" }}
                          placeholder="Select"
                        />
                        <Select.Content>
                          <Select.Group>
                            {weeks.map((week) => (
                              <Select.Item
                                value={"Week " + week}
                                key={"Week " + week}
                              >
                                Week {week}
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Content>
                      </Select.Root>
                    )}
                  />
                </Flex>
                <ErrorMessage>{errors.week?.message}</ErrorMessage>
                <Flex mt="2">
                  <Text style={{ width: "20%" }} mt="1">
                    Hours
                  </Text>
                  <TextField.Root
                    style={{ width: "70%" }}
                    radius="none"
                    type="number"
                    step="any" // Allows for floating-point numbers
                    {...register("hours", { valueAsNumber: true })}
                    placeholder="Hours"
                  />
                </Flex>
                <ErrorMessage>{errors.hours?.message}</ErrorMessage>
                <Box
                  mt="4"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Button disabled={isSubmitting}>
                    {editingWeekHours ? "Update" : "Create"}
                    {isSubmitting && <Spinner />}
                  </Button>
                </Box>
              </Flex>
            </Container>
          </Box>
        </form>
      )}

      {weekHours.length == 0 && !axiosError && (
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

      {weekHours.length > 0 && (
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
                    Week
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center">
                    Hours
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center">
                    Action
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {weekHours.map((hours) => (
                  <Table.Row key={hours._id}>
                    <Table.RowHeaderCell align="center">
                      {hours.week}
                    </Table.RowHeaderCell>
                    <Table.Cell align="center">{hours.hours}</Table.Cell>
                    <Table.Cell align="center">
                      <Button onClick={() => handleEdit(hours._id)}>
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
