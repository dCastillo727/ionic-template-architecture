import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TranslatePipe],
})
export class HomePage implements OnInit {
  private translate = inject(TranslateService);
  private language: string = 'es';

  constructor() {}

  async ngOnInit(): Promise<void> {
    const info = await Device.getLanguageCode();
    const deviceLanguage = info.value;
    const supportedLangs = ['en', 'es'];
    this.language = supportedLangs.includes(deviceLanguage) ? deviceLanguage : 'es';
    this.translate.use(this.language);
  }
}
