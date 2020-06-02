import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

    public validateNextStep(step: number, formToValidate: FormGroup, userRole: string): boolean {
      return formToValidate.valid;
    }
}
