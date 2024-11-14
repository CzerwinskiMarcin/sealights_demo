import { HttpClient } from "@angular/common/http";
import { BaseModel } from "../models/base.model";

export abstract class BaseService<ResponseInterface, AppInterface extends BaseModel<ResponseInterface, AppInterface>> {
  protected readonly ENDPOINT = 'http://localhost:3000/api';

  constructor(protected http: HttpClient) { }
}
