import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Data, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MetaTagService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {}

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  updateMetaTags(data: Data) {
    if (data['description']) {
      this.metaService.updateTag({
        name: 'description',
        content: data['description'],
      });
    }

    if (data['keywords']) {
      this.metaService.updateTag({
        name: 'keywords',
        content: data['keywords'],
      });
    }

    if (data['robots']) {
      this.metaService.updateTag({
        name: 'robots',
        content: data['robots'],
      });
    } else {
      this.metaService.updateTag({
        name: 'robots',
        content: 'follow,index',
      });
    }

    if (data['ogUrl']) {
      this.metaService.updateTag({
        property: 'og:url',
        content: data['ogUr'],
      });
    } else {
      this.metaService.updateTag({
        property: 'og:url',
        content: this.router.url,
      });
    }

    if (data['ogTitle']) {
      this.metaService.updateTag({
        property: 'og:title',
        content: data['ogTitle'],
      });
    } else if (data['title']) {
      this.metaService.updateTag({
        property: 'og:title',
        content: data['title'],
      });
    }

    if (data['ogDescription']) {
      this.metaService.updateTag({
        property: 'og:description',
        content: data['ogDescription'],
      });
    }

    if (data['ogImage']) {
      this.metaService.updateTag({
        property: 'og:image',
        content: data['ogImage'],
      });
    }

    if (data['ogType']) {
      this.metaService.updateTag({
        property: 'og:type',
        content: data['ogType'],
      });
    } else {
      this.metaService.updateTag({
        property: 'og:type',
        content: 'website',
      });
    }
  }
}
