import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoapp';
  welcome = 'Welcome to the Todo App';
  tareas=[
    'instalar Angular CLI',
    'crear nuevo proyecto',
    'crear componentes'
  ]
}
