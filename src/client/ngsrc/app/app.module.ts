import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlHandlingStrategy, UrlTree } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Ng1UpgradedServicesModule } from './ajs-upgraded-services';

// components/services that are being downgraded need to be added to our main app module's entryComponents/providers
// their respective modules added to our imports
import { GithubModule } from './github/github.module';
import { FileInfoCardComponent } from './github/file-info-card/file-info-card.component';

// import all of our downgraded components and services
import './downgrades';
import {HelloWorldComponent} from './hello-world/hello-world.component';

export class AngularUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    switch (url.toString()) {
      case '/hello-world':
      case '/undefined-angular-route':
        return true;
      default:
        return false;
    }
  }

  extract(url: UrlTree): UrlTree {
    return url;
  }

  merge(url: UrlTree, whole: UrlTree): UrlTree {
    return url;
  }
}

@NgModule({
  imports: [
    BrowserModule,
    GithubModule,
    UpgradeModule,
    AppRoutingModule,
    Ng1UpgradedServicesModule
  ],
  declarations: [
    AppComponent,
    HelloWorldComponent
  ],
  entryComponents: [
    FileInfoCardComponent,
    HelloWorldComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: UrlHandlingStrategy, useClass: AngularUrlHandlingStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
  constructor(private upgrade: UpgradeModule) {
    upgrade.bootstrap(document.body, ['angularSeed', 'ng.downgrades'], {strictDi: true})
  }

  ngDoBootstrap() { }
}
