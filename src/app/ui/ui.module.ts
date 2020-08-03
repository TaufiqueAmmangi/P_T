import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterNavComponent } from './footer-nav/footer-nav.component';

@NgModule({
  imports: [
    CommonModule,
    // AppRoutingModule
    RouterModule
  ],
  declarations: [TopNavComponent, FooterNavComponent],
  exports: [TopNavComponent, FooterNavComponent]
})
export class UiModule { }
