import axios from "axios";

export default function handler(req, res, next) {
  async function getURI(api, payload) {
    try {
      console.log(">>> api", api);
      console.log(payload);
      // const response = await axios.get(url, { queries: payload });
      // const payload = {
      //   queries: [
      //     {
      //       package: {
      //         name: "next",
      //         ecosystem: "npm",
      //       },
      //       version: "13.5.6",
      //     },
      //     {
      //       package: {
      //         name: "rollup",
      //         ecosystem: "npm",
      //       },
      //       version: "4.9.6",
      //     },
      //     {
      //       package: {
      //         name: "vue",
      //         ecosystem: "npm",
      //       },
      //       version: "3.2.29",
      //     },
      //     {
      //       package: {
      //         name: "nanoid",
      //         ecosystem: "npm",
      //       },
      //       version: "3.3.7",
      //     },
      //     {
      //       package: {
      //         name: "vite",
      //         ecosystem: "npm",
      //       },
      //       version: "2.6.4",
      //     },
      //   ],
      // };
      const response = await axios.post(api, { queries: payload });
      // console.log(">>> RES", response);
      if (response.status !== 200) {
        return res
          .status(response.status)
          .json({ type: "error", message: response.statusText });
      } else {
        return res.json(JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(">>> ERR", error.message);
      // return res.status(500).json({ type: 'error', message: error.message });
    }
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  // console.log(res, "res");
  // debugger;
  // console.log(">>> req", req.headers.api);
  getURI(req.headers.api, req.body.payload);
  // getURI(JSON.parse(req.body)["my-url"]);
}
