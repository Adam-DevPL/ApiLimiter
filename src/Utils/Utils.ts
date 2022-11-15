import { UrlRequest } from "../interaces/UrlReqest";

export class Utils {
  private static instance: Utils;
  private urlsArray: UrlRequest[] = [];

  private constructor() {}

  public static getInstance(): Utils {
    if (!Utils.instance) {
      Utils.instance = new Utils();
    }
    return Utils.instance;
  }

  public findUrl(url: string): UrlRequest {
    return this.urlsArray.find((urlFromList) => urlFromList.urlCall === url);
  }

  public createUrl(url: string): UrlRequest {
    const foundUrl = {
      actualCallUrl: 0,
      urlCall: url,
      dateCall: new Date(),
      rateLimitForUrl: 0,
    };
    this.urlsArray.push(foundUrl);

    return foundUrl;
  }

  public updateUrlsArray(urlRequest: UrlRequest): void {
    this.urlsArray.forEach((urlFromList) => {
      if (urlFromList.urlCall === urlRequest.urlCall) {
        urlFromList.dateCall = urlRequest.dateCall;
        urlFromList.actualCallUrl = urlRequest.actualCallUrl;
      }
    });
  }
}
