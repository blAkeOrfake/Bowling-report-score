import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient) {
    
  }

  readFileFromTxt(){
    return this.http.get("assets/files/wyniki.txt", { responseType: 'text' as 'json'})
  }
}
