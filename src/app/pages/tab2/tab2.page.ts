import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science','sports','technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event){
    this.noticias = []; 

    this.cargarNoticias(event.detail.value);
  }
  // Le pasamos el evento para poder finalizar la carga del infinite:
  cargarNoticias(categoria: string, event?){
    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(resp =>{
      this.noticias.push(...resp.articles);
    });
    // Cargamos el completado cuando haga la carga:
    if(event){
      event.target.complete();
    }
  }

  // Creamos el metodo:
  loadData(event){
    // Ejecutamos el metodo de cargar noticias y le pasamos el segmento y el event como segundo argumento:
    this.cargarNoticias(this.segment.value, event);
  }

}