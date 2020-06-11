import { Injectable } from '@angular/core';
import { TokenDecoded } from 'src/app/interfaces/token/token-decoded';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenInfoService {

  constructor() {}

  getTokenData(token: string): TokenDecoded {
    return jwt_decode(token); 
  }

}