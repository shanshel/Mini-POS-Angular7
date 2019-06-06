import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by <b>
                    <a href="https://enjaz.tech" target="_blank">Enjaz Technology</a>
                  </b>
      2019
    </span>
  `,
})
export class FooterComponent {
}
