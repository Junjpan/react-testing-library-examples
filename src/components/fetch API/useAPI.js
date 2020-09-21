import { useState} from "react";

const useAPI = (initialData = null) => {
  const initialState = {
    data: initialData,
    loading: false,
    success: false,
    error: null,
  };

  const [response, setResponse] = useState(initialState);

  const callAPI = async (URL, options = { method: "GET" }) => {

    setResponse({ ...response, loading: true });
    try {
      const res = await fetch(URL, options);
      if (res.status < 200 || res.status >= 300)
        throw new Error("Failed to Fetch");
      const json = await res.json();
  
      setResponse({
        data: json,
        success: true,
        loading: false,
        error: null,
      });
    } catch (err) {

      setResponse({
        data: initialData,
        success: false,
        loading: false,
        error: err.message,
      });
    }
  };

  return [response,callAPI]
};

export default useAPI;
