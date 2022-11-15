import { request } from "./httpsMethods";
import { ApiResponse, IApiLimiter, MethodRequest, UrlRequest } from "./interaces/UrlReqest";
import { Utils } from "./Utils/Utils";


export class ApiLimiter implements IApiLimiter {
  private static instance: ApiLimiter;
  private urlsArray: Utils;

  private constructor() {
    this.urlsArray = Utils.getInstance();
  }
  getInstance: () => ApiLimiter;

  public static getInstance(): ApiLimiter {
    if (!ApiLimiter.instance) {
      ApiLimiter.instance = new ApiLimiter();
    }
    return ApiLimiter.instance;
  }

  async makeRequest(
    url: string,
    method: MethodRequest = "GET",
    data: any = null
  ): Promise<ApiResponse> {
    let foundUrl: UrlRequest = this.urlsArray.findUrl(url);
    if (!foundUrl) {
      foundUrl = this.urlsArray.createUrl(url);
    }
    const nowDate = new Date();

    const elapsedTimeInMinutes =
      nowDate.getTime() - foundUrl.dateCall.getTime();

    if (elapsedTimeInMinutes > 1000 * 60 || foundUrl.rateLimitForUrl === 0) {
      foundUrl.dateCall = nowDate;
      foundUrl.actualCallUrl = 0;
    } else {
      foundUrl.actualCallUrl += 1;
    }

    this.urlsArray.updateUrlsArray(foundUrl);

    if (foundUrl.actualCallUrl <= foundUrl.rateLimitForUrl) {
      try {
        return request(foundUrl.urlCall, method, data);
      } catch (error) {
        return Promise.resolve({
          data: null,
          status: 404,
          error: error,
        });
      }
    } else {
      return Promise.resolve({
        data: null,
        status: 404,
        error: "Limit of enters exceeded",
      });
    }
  }

  setRateLimit(url: string, limit: number) {
    let foundUrl: UrlRequest = this.urlsArray.findUrl(url);
    if (!foundUrl) {
      foundUrl = this.urlsArray.createUrl(url);
    }
    foundUrl.rateLimitForUrl = limit;
    this.urlsArray.updateUrlsArray(foundUrl);
  }
}
