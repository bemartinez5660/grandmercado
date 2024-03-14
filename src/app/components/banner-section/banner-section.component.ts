import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-banner-section',
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    RouterModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerSectionComponent implements OnInit {
  @Input() link_enabled: boolean = false;
  @Input() image_large: string | null = null;
  @Input() image_medium: string | null = null;
  @Input() image_small: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNavigate() {}
}
