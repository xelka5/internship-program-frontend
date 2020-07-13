import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() {}

  getTrackingNumberFromUrl(url: string): string {
    return url.split('/').pop();
  }
}