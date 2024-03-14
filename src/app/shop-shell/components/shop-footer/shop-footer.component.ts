import { Component, OnInit } from '@angular/core';
import { Agency, LOCAL_STORAGE_AGENCY } from 'src/app/models/app.models';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-shop-footer',
  templateUrl: './shop-footer.component.html',
  styleUrls: ['./shop-footer.component.scss'],
})
export class ShopFooterComponent implements OnInit {
  agencyInfo!: Agency;

  constructor(public storageService: LocalStorageService) {
    const agency = this.storageService.getItem(LOCAL_STORAGE_AGENCY);
    if (agency) {
      this.agencyInfo = JSON.parse(agency);
    }
  }

  ngOnInit(): void {}
}
