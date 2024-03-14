import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionsService } from './services/sessions.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-angular';

  constructor(private session: SessionsService) {}

  ngOnInit() {
    this.session.sessionHandler();
  }
}
