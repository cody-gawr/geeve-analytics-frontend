import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgVerticalTabsModule } from '../../projects/ng-vertical-tabs/src/lib/ng-vertical-tabs.module';
import { PeopleModule } from './people/people.module';
import { PeopleService } from './people/people.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgVerticalTabsModule.forRoot(),
    PeopleModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
