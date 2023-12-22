import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import Tarea from '../model/tareas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './pendientes.component.html',
  styleUrl: './pendientes.component.css'
})
export class PendientesComponent {



  myformulario = new FormControl('', {
    nonNullable: true, validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      //validar si el valor contiene solo espacios
      (control) => {
        const value = control.value?.trim();
        const valid = value === '' ? { blank: true } : null;
        return valid;
      }
    ]
  });

  myformularioedit = new FormControl('', {
    nonNullable: true, validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      //validar si el valor contiene solo espacios
      (control) => {
        const value = control.value?.trim();
        const valid = value === '' ? { blank: true } : null;
        return valid;
      }
    ]
  });

  constructor() {
    this.myformulario.valueChanges.subscribe((value) => {
      console.log(value);
    })
  }

  signaltareas = signal<Tarea[]>([
    { id: 1, tarea: 'Tarea 1', estado: false },
  ])

  agregartarea() {
    if (this.myformulario.valid) {
      let nuevatarea: Tarea = {
        id: Date.now(),
        tarea: this.myformulario.value,
        estado: false
      };
      this.signaltareas.update((TAREA) => [...TAREA, nuevatarea]);
      alert('tarea agregada')
      this.myformulario.setValue('');
      return
    }
    alert('tarea no agregada')
    this.myformulario.setValue('');
  }

  editartarea(index: number,value: string) {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea, i) =>
        i === index ? { ...tarea, editable: true } : tarea
      )
    );
    this.myformularioedit.setValue(value);
  }

  guardaredit(index: number) {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea, i) =>
        i === index ? { ...tarea, tarea: this.myformularioedit.value, editable: false } : tarea
      )
    );
    this.myformularioedit.setValue('');
    alert('tarea editada')
  }

  borrartarea(index: number) {
    this.signaltareas.update((tareas) => tareas.filter((_, i) => i !== index));
  }

  completartarea(index: number) {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea, i) =>
        i === index ? { ...tarea, estado: !tarea.estado } : tarea
      )
    );
  }

  todaslastareas() {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea) =>
        tarea.estado === false ? { ...tarea, estado: true } : tarea
      )
    );
  }

  pendientestareas() {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea) =>
        tarea.estado === true ? { ...tarea, estado: false } : tarea
      )
    );
  }

  completartareas() {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea) =>
        tarea.estado === false ? { ...tarea, estado: true } : tarea
      )
    );
  }

  eliminartareascompleted() {
    this.signaltareas.update((tareas) =>
      tareas.filter((tarea) => tarea.estado === false)
    );
  }
}
