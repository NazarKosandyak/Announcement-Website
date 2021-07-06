import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMain } from '../interface/main.interface';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  url:string
  constructor(
    private http:HttpClient
  ) { 
    this.url = 'https://mockend.com/org/repo/announcement'
  }
  get():Observable<IMain>{
    return this.http.get<IMain>(this.url)
  }
  post(item):Observable<IMain>{
    return this.http.post<IMain>(this.url,item)
  }
  update(item,id):Observable<IMain>{
    return this.http.put<IMain>(`${this.url}/${id}`,item)
  }
  delete(id):Observable<IMain>{
    return this.http.delete<IMain>(`${this.url}/${id}`)
  }
}
