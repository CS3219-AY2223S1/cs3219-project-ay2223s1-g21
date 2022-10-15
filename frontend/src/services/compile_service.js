import axios from "axios";

export const requestCompilation = (lang, source) => {
  if (lang === "JAVASCRIPT")
    lang = "JAVASCRIPT_NODE" //special processing as there are 2 ways to compile js code.
  return axios.post(
    process.env.REACT_APP_COMPILE_SERVER_URL + "/api/send_compile_request",
    {
      lang,
      source,
      input: "",
      memory_limit: 243232,
      time_limit: 5,
    },
    {
      timeout: 10000
    }
  );
};


export const getCompilationResult = (url) => {
  return axios.post(
    process.env.REACT_APP_COMPILE_SERVER_URL + "/api/get_result",
    {
      url
    },
    {
      timeout: 10000
    }
  );
}
