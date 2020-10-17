import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestServicesService {

  produseUrl = "http://localhost:3000/get-produse";
  ingredienteUrl = "http://localhost:3000/get-ingrediente/";
  recenziiUrl = "http://localhost:3000/get-recenzii/";
  ratingUrl = "http://localhost:3000/get-rating/";
  addRatingUrl = "http://localhost:3000/add-rating/";
  deleteRecenzieUrl = "http://localhost:3000/delete-recenzie/";
  addRecenzieUrl = "http://localhost:3000/add-recenzie/";
  getToateIngredienteleUrl = "http://localhost:3000/get-toate-ingredientele";
  filtrareProduseUrl = "http://localhost:3000/filtrare-ingrediente";

  constructor(private http: HttpClient) { }

  getProduse() {
    return this.http.get<any>(this.produseUrl);
  }

  getToateIngredientele() {
    return this.http.get<any>(this.getToateIngredienteleUrl);
  }

  getIngredienteProdus(id) {
    return this.http.get<any>(this.ingredienteUrl + id);
  }

  getRecenziiProdus(id) {
    return this.http.get<any>(this.recenziiUrl + id);
  }

  getRatingProdus(id) {
    return this.http.get<any>(this.ratingUrl + id);
  }

  addRatingProdus(id, nota) {
    return this.http.get<any>(this.addRatingUrl + id + '/' + nota);
  }

  deleteRecenzieProdus(id) {
    return this.http.delete<any>(this.deleteRecenzieUrl + id);
  }

  addRecenzieProdus(id, recenzie) {
    return this.http.post<any>(this.addRecenzieUrl + id, recenzie);
  }

  filtrareProduse(ingredienteDa) {
    return this.http.post<any>(this.filtrareProduseUrl, ingredienteDa);
  }
}
