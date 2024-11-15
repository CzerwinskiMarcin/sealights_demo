import { HttpClient } from "@angular/common/http";

import { BaseModel } from "../models/base.model";
import { HttpService } from "./http.service";

export abstract class BaseService<ResponseInterface, AppInterface extends BaseModel<ResponseInterface, AppInterface>> extends HttpService<ResponseInterface> {
  // TODO: Get in from .env or whatever source base config data
  protected readonly ENDPOINT = 'http://localhost:3000/api';

  constructor(http: HttpClient) { super(http); }
}
