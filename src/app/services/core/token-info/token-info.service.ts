import { Injectable } from '@angular/core';
import { TokenData } from 'src/app/interfaces/token/token-info';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenInfoService {

  constructor() {}

  getTokenData(token: string): TokenData {
    return jwt_decode(token); 
  }

}