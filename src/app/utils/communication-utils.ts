import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationUtils {
    
  /**
   * 
   * @param objectToTransform 
   */
  createFormDataBody(objectToTransform: any) {
    let params = new HttpParams();

    Object.keys(objectToTransform).forEach(key => {
      params = params.append(key, objectToTransform[key]);
    });

    return params;
  }
}