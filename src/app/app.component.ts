import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogPessoal';

  constructor(
    public auth: AuthService //injetando dependencia do auth service para conseguir usá-lo no html
  ){}
}
