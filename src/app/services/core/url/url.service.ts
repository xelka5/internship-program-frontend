import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() {}

  getTrackingNumberFromUrl(url: string): string {
    return url.split('/').pop();
  }
}