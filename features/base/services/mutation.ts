import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseApiService from "./api";
import { AxiosError } from "axios";
import { DocumentVerificationResponse, ErrorResponse, FileUploadRequest } from "../types";

export const useDocumentVerification = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DocumentVerificationResponse,
    AxiosError<ErrorResponse>,
    FileUploadRequest
  >({
    mutationFn: (data: FileUploadRequest) =>
      baseApiService.startVerification(data.file),

    onSuccess: async (success) => {
      await queryClient.invalidateQueries({
        queryKey: ["file-data"],
      });
    },
  });
};
