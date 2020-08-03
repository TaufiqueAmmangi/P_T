import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../content/data.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'story-feed',
  templateUrl: './story-feed.component.html',
  styleUrls: ['./story-feed.component.scss']
})
export class StoryFeedComponent implements OnInit {

  feed: Observable<any[]>;

  items: Observable<any[]>;
  pages$: Observable<number>;
  currentPage$ = new BehaviorSubject(1);
  filterOption: string = 'all';
  searchValue: string = '';

  preload;
  constructor(private data: DataService, private route: ActivatedRoute) { }
  @ViewChild('searchbar') searchbar: ElementRef;
  public searchText = '';

  toggleSearch: boolean = false;


  ngOnInit() {
   // this.updateResults();
    this.feed = this.route.data.switchMap(data => {
      return this.data.getFeed(data.feed);
      console.log(this.feed);
    });
   

    this.pages$ = this.feed.map(arr => Math.floor(arr.length / 30) + 1);

    this.items = this.currentPage$.switchMap(page => {
      return this.feed.map(items => items.slice((page - 1) * 30, (page - 1) * 30 + 30));

    });
    console.log(this.items);
    localStorage.setItem("itemData", JSON.stringify(this.data));
    let itemData = JSON.parse(localStorage.getItem("itemData"));
    console.log(itemData);


  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage() {
    this.currentPage$.next(this.currentPage$.value - 1);
  }
  // async updateResults() {
  //   this.items = this.searchByValue(this.items);
  // }

  // searchByValue(itemsfiltered) {
  //   return itemsfiltered.filter(item => {
  //     if (this.searchValue.trim() == '') {
  //       return true;
  //     } else {
  //       return item.title.toLowerCase().includes(this.searchValue.trim().toLocaleLowerCase());
  //     }
  //   })
  // }

  // filterByOption(items) {
  //   return items.filter(item => {
  //     if (this.filterOption === 'all' || this.filterOption === item.type) {
  //       return true;
  //     } 
  //   })
  // }
}
