import axios from "axios";

export const handleSubmit = async (
  url: string,
  data: any,
  setMessage: (message: string) => void,
  navigate?: (path: string) => void,
  successPath?: string
) => {
  try {
    const response = await axios.post(url, data);
    setMessage(response.data.message);
    if (navigate && successPath) {
      navigate(successPath);
    }
  } catch (error: any) {
    setMessage(error.response?.data.error || "An error occurred");
  }
};
