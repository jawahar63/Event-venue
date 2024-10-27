import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './pages/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eventOutline';
}
