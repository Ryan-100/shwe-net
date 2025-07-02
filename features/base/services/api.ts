import appAxios from "@/lib/appAxios";

const baseApiService = {
  startVerification: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    if (formData) {
      const response = await appAxios.post("/start_verification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    }
  },
};

export default baseApiService;
