import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { BehaviorSubject, filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { I18nService, Logger } from './services';
import { AppService } from './services/app.service';
import { IconService } from './services/icon.service';
import { MetaTagService } from './services/meta-tag.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Grandmercado';
  chatAppClass!: string;
  static isBrowser = new BehaviorSubject<boolean | null>(null);

  constructor(
    private i18nService: I18nService,
    private iconService: IconService,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private metaTagService: MetaTagService,
    private gtmService: GoogleTagManagerService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(
      environment.defaultLanguage,
      environment.supportedLanguages
    );

    // Setup icon registry
    this.iconService.registerIcons();

    // Track navigation events with Google Analytics
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url,
        };
        this.gtmService.pushTag(gtmTag);
      }
    });

    // Update meta tag by activated route,
    // except '/products/..' and '/product/..' and /home routes
    // because they have there own behavior
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (
          !this.router.url.startsWith('/products') &&
          !this.router.url.startsWith('/product') &&
          !this.router.url.startsWith('/home')
        ) {
          let rt = this.getChild(this.activatedRoute);
          console.log(this.router.url);

          rt.data.subscribe((data) => {
            this.metaTagService.updateTitle(data['title']);
            this.metaTagService.updateMetaTags(data);
          });
        }
      });
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }
    return activatedRoute;
  }
}
