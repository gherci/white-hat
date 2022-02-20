import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../../services/http.service';
import { GameModel, JackpotModel } from './game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
  pageGameCategory: string = '';
  gamesList: GameModel[] = [];
  jackpotFeedList: JackpotModel[] = [];
  feedIntervalSubscription: Subscription | undefined;
  nonTopOrNewPageCategories: string[] = ['slots', 'jackpots', 'live', 'blackjack', 'roulette', 'table', 'poker', 'other'];
  showButtonAndName = false;

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getGameLists();
    this.getJackpotFeed();

    this.feedIntervalSubscription = interval(500).subscribe(() => {
      this.getJackpotFeed();
    });
  }

  ngOnDestroy() {
    this.feedIntervalSubscription?.unsubscribe();
  }

  getJackpotAmount(id: string): number | undefined {
    return this.jackpotFeedList?.find(game => game.game === id)?.amount;
  }

  getRibbonText(game: GameModel): string {
    let ribbonText = '';
    if (this.nonTopOrNewPageCategories.includes(this.pageGameCategory)) {
      if (game.categories.includes('top')) {
        ribbonText = 'top';
      } else if (game.categories.includes('new')) {
        ribbonText = 'new';
      }
    } else if (this.pageGameCategory === 'top' && game.categories.includes('new')) {
      ribbonText = 'new';
    } else if (this.pageGameCategory === 'new' && game.categories.includes('top')) {
      ribbonText = 'top';
    }
    return ribbonText;
  }

  showButton() {
    this.showButtonAndName = true;
  }

  private getGameLists() {
    this.activatedRoute.data.subscribe(data => {
      this.pageGameCategory = data.id;
      this.httpService.fetchGamesFeed()
        .pipe(
          map(res => res.filter((el: GameModel) => {
            if (this.pageGameCategory !== 'other') {
              return el.categories.includes(this.pageGameCategory);
            } else {
              const otherCategories = ['ball', 'virtual', 'fun'];
              return el.categories.some((item: string) => otherCategories.includes(item));
            }
          }))
        ).subscribe(res => {
        this.gamesList = res;
      }, (error) => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  private getJackpotFeed(): void {
    this.httpService.fetchJackpotFeed()
      .subscribe(resp => {
        this.jackpotFeedList = resp;
      }, (error) => {
        console.log(error);
      });
  }
}
