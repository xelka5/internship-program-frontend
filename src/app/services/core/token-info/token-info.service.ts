import { Injectable } from '@angular/core';
import { TokenDecoded } from 'src/app/interfaces/token/token-decoded';
import * as jwt_decode from 'jwt-decode';
import { UserRole } from 'src/app/shared/enums';


@Injectable({
  providedIn: 'root'
})
export class TokenInfoService {

  constructor() {}

  getTokenData(token: string): TokenDecoded {
    return jwt_decode(token); 
  }

  getUserRoleFromToken(token: string): UserRole {
    return jwt_decode(token).authorities[0];
  }

}