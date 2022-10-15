import axios from "axios";
import "dotenv/config";

export const compileRequest = (
  lang,
  memory_limit,
  time_limit,
  source,
  input
) => {
  const headers = {
    "Content-Type": "application/json",
    "client-secret": process.env.HACKEREARTH_CLIENT_SECRET,
  };

  return axios.post(
    process.env.HACKEREARTH_URL,
    {
      lang,
      memory_limit,
      time_limit,
      source,
      input,
    },
    {
      headers: headers,
    }
  );
};

export const getCompileResponse = async (status_update_url) => {
  // getResultUrl will return a valid url to obtain the result of compilation if successful.
  // else: it would return the code compilation error message.
  const result = await getResultUrl(status_update_url);
  if (isUrl(result)) {
    return axios.get(result).then((res) => res.data);
  }
  return result;
};

const getResultUrl = async (status_update_url) => {
  const headers = {
    "Content-Type": "application/json",
    "client-secret": process.env.HACKEREARTH_CLIENT_SECRET,
  };

  const resultUrl = new Promise((resolve) =>
    setTimeout(async () => {
      const result = await axios
        .get(status_update_url, { headers: headers })
        .then((res) => {
          return res.data.result.compile_status == "OK"
            ? (res.data.result.run_status.status == "AC" ? res.data.result.run_status.output : res.data.result.run_status.stderr)
            : res.data.result.compile_status == "Compiling..."
            ? null 
            : res.data.result.compile_status
        });

      if (result) {
        return resolve(result);
      }

      return resolve(getResultUrl(status_update_url));
    }, 1000)
  );

  return await resultUrl;
};

function isUrl(s) {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}
