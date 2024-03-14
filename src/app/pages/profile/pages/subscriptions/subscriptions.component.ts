import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscriptions } from 'src/app/models/shop.models';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  subsForm = this.fb.group({
    newsletters: new FormControl<boolean>(false, { nonNullable: true }),
    promotions: new FormControl<boolean>(false, { nonNullable: true }),
    reminders: new FormControl<boolean>(false, { nonNullable: true }),
    updates: new FormControl<boolean>(false, { nonNullable: true }),
  });
  constructor(
    private fb: FormBuilder,
    private subsService: SubscriptionsService
  ) {
    this.subsService.getSubscriptions().subscribe((data: Subscriptions) => {
      if (data) {
        delete data.id;
        this.subsForm.setValue(data);
      }
    });
  }

  onSubmit() {
    this.subsService
      .updateSubscriptions(this.subsForm.value as Subscriptions)
      .subscribe();
  }

  ngOnInit(): void {}
}
