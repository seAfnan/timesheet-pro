"use client";
import axios, { AxiosError } from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { BACKEND_URL } from "../lib/Constants";
import { useSession } from "next-auth/react";

// export const ProjectContext = createContext<Project[]>([]);
interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => void;
}
export const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  fetchProjects: () => {},
});

export interface Project {
  _id: string;
  name: string;
  description: string;
  type: string;
}

export const ProjectProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { status, data: session } = useSession();
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/project", {
        headers: { Authorization: `Bearer ${session?.backendToken.accessKey}` },
      });
      setProjects(response.data);
    } catch (error) {
      setAxiosError(error as AxiosError);
    }
  };

  useEffect(() => {
    if (session && session.backendToken && session.backendToken.accessKey) {
      fetchProjects();
    }
  }, [session]);

  return (
    <ProjectContext.Provider value={{ projects, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
