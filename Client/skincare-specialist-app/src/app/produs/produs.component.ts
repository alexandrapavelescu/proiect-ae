import { Component, OnInit } from '@angular/core';
import { RestServicesService } from '../rest-services.service';
import { Userdata } from '../userdata';

@Component({
  selector: 'app-produs',
  templateUrl: './produs.component.html',
  styleUrls: ['./produs.component.css']
})
export class ProdusComponent implements OnInit {
  produs = undefined;
  ingrediente = [];
  recenzii = [];
  ratings = [];
  avgRating = 0;
  username = "";
  comentariu = "";
  recenzieEditata = undefined;

  constructor(private userdata: Userdata,
              private restServices: RestServicesService) { }

  ngOnInit() {
    this.produs = this.userdata.activeProduct;
    this.getIngrediente();
    this.getRecenzii();
    this.getRatings();
  }

  getIngrediente() {
    this.restServices.getIngredienteProdus(this.produs.id_produs).subscribe(
      response => {
        this.ingrediente = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  getRecenzii() {
    this.restServices.getRecenziiProdus(this.produs.id_produs).subscribe(
      response => {
        this.recenzii = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  getRatings() {
    this.restServices.getRatingProdus(this.produs.id_produs).subscribe(
      response => {
        this.ratings = response;
        this.calculeazaRating();
      },
      error => {
        console.log(error);
      }
    )
  }

  calculeazaRating() {
    this.avgRating = 0;
    for (let i=0; i < this.ratings.length; i++) {
      this.avgRating += this.ratings[i].nota;
    }
    this.avgRating /= this.ratings.length;
  }

  addRating(nota) {
    this.restServices.addRatingProdus(this.produs.id_produs, nota).subscribe(
      response => {
        let rating = {
          id_rating: response.insertedId,
          username: 'generic_user',
          id_produs: this.produs.id_produs,
          nota: nota
        };
        this.ratings.push(rating);
        console.log(this.ratings);
        this.calculeazaRating();
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteRecenzie(id) {
    this.restServices.deleteRecenzieProdus(id).subscribe(
      response => {
        this.getRecenzii();
      },
      error => {
        console.log(error);
      }
    )
  }

  addRecenzie() {
    let recenzie = {
      username: this.username,
      comentariu: this.comentariu
    }
    this.restServices.addRecenzieProdus(this.produs.id_produs, recenzie).subscribe(
      response => {
        this.getRecenzii();
        this.username = "";
        this.comentariu = "";
      },
      error => {
        console.log(error);
      }
    )
  }

}
