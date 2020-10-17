import { Component, OnInit } from '@angular/core';
import { RestServicesService } from '../rest-services.service';
import { Userdata } from '../userdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-produse',
  templateUrl: './lista-produse.component.html',
  styleUrls: ['./lista-produse.component.css']
})
export class ListaProduseComponent implements OnInit {
  produse = [];
  ingredienteDa = [];
  ingredienteNu = [];

  constructor(private restServices: RestServicesService,
              private userdata: Userdata,
              private router: Router) { }

  ngOnInit(): void {
    this.getProduse();
    this.getIngrdiente();
  }

  getProduse() {
    this.restServices.getProduse().subscribe(
      response => {
        this.produse = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  getIngrdiente() {
    this.restServices.getToateIngredientele().subscribe(
      response => {
        this.ingredienteDa = response;
        this.ingredienteNu = response;
        this.initializareIngrediente();
      },
      error => {
        console.log(error)
      }
    )
  }

  initializareIngrediente() {
    for (let i = 0; i < this.ingredienteDa.length; i++) {
      this.ingredienteDa[i].selectat = false;
      this.ingredienteNu[i].selectat = false;
    }
    console.log(this.ingredienteDa);
  }

  goToProdus(produs) {
    this.userdata.activeProduct = produs;
    this.router.navigate(['/produs']);
  }

  aplicaFiltru() {
    let daIds = '';
    for (let i=0; i<this.ingredienteDa.length; i++) {
      if (this.ingredienteDa[i].selectat) {
        daIds = daIds + "'" + this.ingredienteDa[i].id_ingredient.toString() + "'";
        if (i != this.ingredienteDa.length - 1) daIds = daIds + ', ';
      }
    }
    console.log(daIds);
    let body = {
      ingredienteDa: daIds
    }
    this.restServices.filtrareProduse(body).subscribe(
      response => {
        this.produse = response;
        console.log('yess');
      },
      error => {
        console.log(error)
      }
    )
  }

}
