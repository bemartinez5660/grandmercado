import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ORDER_STATUS_ICONS, ShopOrder } from '../../models/shop.models';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, TranslateModule, SafeHtmlPipe],
})
export class OrderTableComponent implements OnInit {
  @Input() orders!: ShopOrder[];

  orderStatusIcon = ORDER_STATUS_ICONS;

  constructor() {}

  ngOnInit(): void {}
}
