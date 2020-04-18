import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../interfaces";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  private baseUrl: string = '/api/category';

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.baseUrl);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  create(name: string, image?: File): Observable<Category> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this.http.post<Category>(this.baseUrl, formData);
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this.http.patch<Category>(`${this.baseUrl}/${id}`, formData);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}/${id}`);
  }
}
