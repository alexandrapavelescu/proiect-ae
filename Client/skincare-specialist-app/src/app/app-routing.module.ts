import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProduseComponent } from './lista-produse/lista-produse.component';
import { ProdusComponent } from './produs/produs.component';

const routes: Routes = [
  { path: '', redirectTo: '/produse', pathMatch: 'full' },
  { path: 'produse', component: ListaProduseComponent },
  { path: 'produs', component: ProdusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
