import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: Result[];
  pushPage: any;
  constructor(public navCtrl: NavController) {
    this.pushPage = DetailsPage;
  }

  // Appelé à chaque fois que tu écris dans la search bar
  getResults(ev: any) {
    // val récupère la valeur contenue dans l'input de la search bar
    let val = ev.target.value;
    return val ? this.results = tabResults : this.results = [];
  }
}

// Interface pour décrire un résultat de recherche
export interface Result {
  title: string;
  author: string;
  date: number; // faudra mettre un object;
  image: string;
}


const tabResults: Result[] = [
  {
    title: "La cambrioleuse",
    author: "Jacquie",
    date: 1,
    image: "https://pbs.twimg.com/profile_images/627117609444581380/7YG7kxA4_400x400.png"
  },
  {
    title: "Fast and Furious 51",
    author: "Marc Bide",
    date: 2,
    image: "https://pbs.twimg.com/profile_images/888969645/30116_117264888296255_117264014963009_164865_6947075_n_400x400.jpg"
  },
  {
    title: "Plus belle la vie - Le Film",
    author: "Jeanine Cagole",
    date: 3,
    image: "http://scrat.hellocoton.fr/img/classic/gipsy-rapper-reprend-wiggle-de-jason-derulo-16711334.jpg"
  }
];