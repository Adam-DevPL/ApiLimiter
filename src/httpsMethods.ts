import https from "https";
import {
  ApiResponse,
  MethodRequest,
  OptionsRequest,
} from "./interaces/UrlReqest";

export const request = <T>(
  url: string,
  method: MethodRequest,
  dataPost: T | null = null
): Promise<ApiResponse> => {
  let options: OptionsRequest = {
    method,
  };

  if (method === "POST" || method === "PATCH") {
    options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return new Promise((resolve, reject) => {
    const req = https
      .request(url, options, (res) => {
        res.setEncoding("utf8");
        let responseBody = "";
        res.on("data", (chunk: any) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            if (method === "DELETE") {
              resolve({
                data: res.statusMessage,
                status: res.statusCode,
                error: null,
              });
            }
            resolve({
              data: JSON.parse(responseBody),
              status: res.statusCode,
              error: null,
            });
          } else {
            resolve({
              data: null,
              status: res.statusCode,
              error: res.statusMessage,
            });
          }
        });
      })
      .on("error", (err) => {
        reject({ data: null, status: 404, error: err });
      });
    if (method === "POST" || method === "PATCH") {
      req.write(JSON.stringify(dataPost));
    }
    req.end();
  });
};
