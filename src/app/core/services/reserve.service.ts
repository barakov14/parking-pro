import {inject, Injectable} from "@angular/core";
import {ApiService} from "../http/api.service";

@Injectable({providedIn: 'root'})

export class ReserveService {
  private readonly apiService = inject(ApiService)
  public reservePayment() {
    return this.apiService.post<void, void>('/api/v1/payment/create')
  }
}
