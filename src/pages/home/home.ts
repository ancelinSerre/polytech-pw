import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { apiKey } from '../../app/tmdb';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: Observable<Result[]>;
  pushPage: any;
  /**
   * Constructeur de la page
   * @param navCtrl 
   */
  constructor(public http: HttpClient) {
    this.results = Observable.of([]);
    this.pushPage = DetailsPage;
  }

  /**
   * Listener pour l'évènement écriture dans la search bar
   * @param ev variable d'environnement
   */
  getResults(ev: any) 
  {
    /* val récupère la valeur contenue dans l'input de la search bar */
    let val = ev.target.value;
    if(val)
      this.results = this.fetchResults(val);
    else
      this.results = Observable.of([]);
  }
  
  /**
   * Récupère les résultats de la recherche initiée par l'user
   * @param query 
   * @returns Observable<Result[]>
   */
  fetchResults(query : string) : Observable<Result[]>
  {
    let url : string = 'https://api.themoviedb.org/3/search/movie'
    return this.http.get<Result[]>(url, 
    {
      params:
      {
        api_key : apiKey,
        query: query,
        language: 'fr'
      }
      /* Pluck nous permet de récupérer uniquement le champ 'results' */
    }).pluck('results');
  }
}

/* Interface pour décrire un résultat de recherche */
export interface Result {  
  vote_count: number,
  id: number,
  video: boolean,
  vote_average: number,
  title: string,
  popularity: number,
  poster_path: string,
  original_language: string,
  original_title: string,
  backdrop_path: string,
  adult: false,
  overview: string,
  release_date: string
}