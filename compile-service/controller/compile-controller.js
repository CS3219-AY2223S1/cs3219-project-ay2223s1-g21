import { compileRequest, getCompileResponse } from "./compileRequest.js";

export const submitCompileRequest = async (req, res) => {
  try {
    const { lang, memory_limit, time_limit, source, input } = req.body;
    const result = await compileRequest(
      lang,
      memory_limit,
      time_limit,
      source,
      input
    )
      .then((response) =>
        res.status(200).json({ resultUrl: response.data.status_update_url })
      )
      .catch((err) => {
        console.log(err.response.data.message)
        res.status(400).json({ message: err.response.data.message })
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Submit Compile Request Failed. Error ${err}` });
  }
};

export const getCompileResult = async (req, res) => {
  try {
    const { url } = req.body;
    if (url) {
      const result = await getCompileResponse(url);
      return res.send(result);
    }
    return res.status(400).json({ message: "Please provide a url." });
  } catch (err) {
    return res.status(500).json({ message: `${err}` });
  }
};
