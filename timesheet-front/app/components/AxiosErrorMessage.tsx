import { AxiosError } from "axios";
import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type AxiosErrorHandlerProps = {
  error: AxiosError | null;
};
interface ErrorResponse {
  message: string;
}

const AxiosErrorMessage: React.FC<AxiosErrorHandlerProps> = ({ error }) => {
  const prevErrorRef = useRef<AxiosError | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error && error !== prevErrorRef.current) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Unauthorized. Please log in.");
          signOut();
        } else {
          const data = error.response.data as ErrorResponse;
          toast.error(data.message);
        }
      } else if (error.request) {
        toast.error(error.request.statusText);
      } else {
        toast.error(error.message);
      }
    }

    prevErrorRef.current = error;
  }, [error]);

  return <Toaster />;
};

export default AxiosErrorMessage;
