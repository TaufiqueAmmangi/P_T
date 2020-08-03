import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../content/data.service';


@Component({
  selector: 'story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss']
})
export class StoryItemComponent implements OnInit {

  @Input() itemId;
  @Input() preload;
  item$;


  constructor(private data: DataService) { }

  ngOnInit() {
    this.item$ = this.data.getItem(this.itemId); 
    localStorage.setItem("itemData", JSON.stringify(this.data.getItem(this.itemId)));
    let itemData = JSON.parse(localStorage.getItem("itemData"));
    console.log(itemData);
  }

}
