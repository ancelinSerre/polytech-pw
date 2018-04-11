import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { apiKey } from '../../app/tmdb';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Shake } from '@ionic-native/shake';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  results: Observable<Result[]>;
  pushPage: any;
  private shakeSubscription: Subscription;

  constructor(public http: HttpClient, private alertCtrl: AlertController,public navCtrl: NavController, 
    public platform: Platform, private shake: Shake) {
    this.results = Observable.of([]);
    this.pushPage = DetailsPage;
  }

  ionViewDidEnter() {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())
    .switchMap( () => this.shake.startWatch())
    .switchMap( () => this.discoverMovies())
    .subscribe( movies => this.showRandomMovieAlert(movies));
  }
  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe();
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

  private discoverMovies() : Observable<Result[]>
  {
    let url : string = 'https://api.themoviedb.org/3/discover/movie'
    return this.http.get<Result[]>(url,
    {
      params:
      {
        api_key: apiKey,
        primary_release_year: '2018',
        language: 'fr',
      }
    }).pluck('results');
  }

  private showRandomMovieAlert(movies: Result[]) : void
  {
    /* On sélectionne un film au hasard parmi le tableau donné */
    let movie : Result = movies[Math.floor(Math.random()*movies.length)];
    /* On créé une alerte avec les informations du film */
    let alert = this.alertCtrl.create({
      title: movie.title,
      message: movie.overview,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(this.pushPage,movie);
          }
        }
      ]
    });
    alert.present();
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