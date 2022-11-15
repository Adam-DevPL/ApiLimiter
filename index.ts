import { ApiLimiter } from "./src/ApiLimiter";

const api = ApiLimiter.getInstance();
api.setRateLimit("https://www.reddit.com/r/popular.json", 3);

(async () => {
  let res;
  const data = { msg: "Hello World!"}

  res = await api.makeRequest("https://www.reddit.com/r/popular.json", "GET");
  console.log(res);
  res = await api.makeRequest("https://www.reddit.com/r/popular.json", "GET");
  console.log(res);
  res = await api.makeRequest("https://www.reddit.com/r/popular.json", "GET");
  console.log(res);
  res = await api.makeRequest("https://www.reddit.com/r/popular.json", "GET");
  console.log(res);
  res = await api.makeRequest("https://www.reddit.com/r/popular.json", "GET");
  console.log(res);
  res = await api.makeRequest("https://www.reddit.com/r/popular.json", "GET");
  console.log(res);

})();
