import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './components/app/loading-spinner/loading-spinner.component';
import { AddViewComponent } from './components/student/add-view/add-view.component';
import { DetailsViewComponent } from './components/student/details-view/details-view.component';
import { ListItemComponent } from './components/student/list-item/list-item.component';
import { ListViewComponent } from './components/student/list-view/list-view.component';
import { StudentEffects } from './state/effects/student.effects';
import { studentReducer } from './state/reducers/student.reducer';

@NgModule({
  declarations: [AppComponent, ListViewComponent, ListItemComponent, AddViewComponent, DetailsViewComponent, LoadingSpinnerComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    StoreModule.forRoot({ students: studentReducer }),
    EffectsModule.forRoot([StudentEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DetailsViewComponent, AddViewComponent],
})
export class AppModule {}
