import axios from "axios";

async function getURI(url, payload, method, res) {
  try {
    let response;

    switch (method) {
      case "POST":
        response = await axios.post(url, { queries: payload });
        break;
      case "PUT":
        response = await axios.put(url, payload);
        break;
      case "DELETE":
        response = await axios.delete(url, payload);
        break;
      default:
        response = await axios.get(url, { queries: payload });
    }

    if (response.status !== 200) {
      return res
        .status(response.status)
        .json({ type: "error", message: response.statusText });
    } else {
      return res.json(JSON.stringify(response.data));
    }
  } catch (error) {
    return res.status(500).json({ type: "error", message: error.message });
  }
}

export default function handler(req, res, next) {
  // const { api: reqApi, endpoint: reqEndpoint } = req.headers;
  // const { payload: reqPayload } = req.body;

  const {
    method: reqMethod,
    headers: { api: reqApi, endpoint: reqEndpoint },
    body: { payload: reqPayload },
  } = req;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  getURI(`${reqApi}${reqEndpoint}`, reqPayload, reqMethod, res);
}
