import { ACCESS_TOKEN_LABEL } from 'src/app/shared/constants/global-constants';

export const jwtModuleConfig = {
    config: {
      tokenGetter: jwtTokenGetter
    }
  }

export function jwtTokenGetter() {
    return localStorage.getItem(ACCESS_TOKEN_LABEL);
}