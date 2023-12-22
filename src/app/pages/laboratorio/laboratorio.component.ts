import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './laboratorio.component.html',
  styleUrl: './laboratorio.component.css'
})
export class LaboratorioComponent {
  title = 'todoapp';
  welcome = 'Welcome to the Todo App';
  tareas = [
    'instalar Angular CLI',
    'crear nuevo proyecto',
    'crear componentes'
  ]
  signaltareas = signal([
    'instalar Angular CLI',
    'crear nuevo proyecto',
    'crear componentes'
  ])
  nombre = signal("david");
  edad = 23;
  disabled = true;
  img = 'https://w3schools.com/angular/pic_angular.jpg';
  persona = signal({
    nombre: 'david',
    edad: 23,
    direccion: {
      calle: 'calle 1',
      ciudad: 'ciudad 1'
    },
    genero: 'masculino',
  })

  colorctrol = new FormControl('black');
  namectrol = new FormControl('david',{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
    ]
  });
  radioctrol = new FormControl(50);

  //estamos leyendo desde la logica
  constructor() {
    this.colorctrol.valueChanges.subscribe((value) => {
      console.log(value);
    })
    this.radioctrol.valueChanges.subscribe((value) => {
      console.log(value);
    })
  }

  clickHandler() {
    alert('click');
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
    this.nombre.set(input.value);
    this.persona.update((props) => ({ ...props, nombre: input.value }));
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

}
