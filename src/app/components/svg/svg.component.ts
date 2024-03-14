import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg',
  template: `<span [innerHTML]="svgIcon"></span>`,
  standalone: true,
})
export class SvgComponent implements OnInit {
  @Input()
  public src!: string;

  public svgIcon!: SafeHtml;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.httpClient
      .get(this.src, { responseType: 'text' })
      .subscribe((value) => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }
}
