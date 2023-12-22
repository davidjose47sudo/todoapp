import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import Tarea from '../model/tareas';

enum Filtro {
  All = 1,
  Pendientes = 2,
  Completadas = 3
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {


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



  signaltareas = signal<Tarea[]>([
    { id: 1, tarea: 'Tarea 1', estado: false },
  ])

  tareas = signal<Tarea[]>([
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
      this.tareas.update(() => [...this.signaltareas()]);
      alert('tarea agregada')
      this.myformulario.setValue('');
      return
    }
    alert('tarea no agregada')
    this.filtro(this.filtroactual)
    this.myformulario.setValue('');
  }

  editartarea(index: number, value: string) {
    this.tareas.update((tareas) =>
      tareas.map((tarea, i) =>
        i === index ? { ...tarea, editable: true } : tarea
      )
    );
    this.myformularioedit.setValue(value);
  }

  guardaredit(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.signaltareas.update((tareas) =>
      tareas.map((tarea, i) =>
        i === index ? { ...tarea, tarea: input.value, editable: false } : tarea
      )
    );
    this.tareas.update(() => [...this.signaltareas()]);
    this.filtro(this.filtroactual)
  }

  borrartarea(index: number) {
    this.signaltareas.update((tareas) => tareas.filter((tarea) => tarea.id !== index));
    this.tareas.update((tareas) => tareas.filter((tarea) => tarea.id !== index));
    this.filtro(this.filtroactual)
  }

  completartarea(index: number) {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea, i) =>
        tarea.id === index ? { ...tarea, estado: !tarea.estado } : tarea
      )
    );
    this.tareas.update((tareas) =>
      tareas.map((tarea, i) =>
        tarea.id === index ? { ...tarea, estado: !tarea.estado } : tarea
      ));
      this.filtro(this.filtroactual)
  }

  eliminartareascompleted() {
    this.signaltareas.update((tareas) =>
      tareas.filter((tarea) => tarea.estado === false)
    );
    this.tareas.update(() => [...this.signaltareas()]);
  }

  public filtroactual: Filtro = 1;
  public tareasactuales: Tarea[] = [];

  filtro(Filtro: Filtro) {
    this.tareas.set(this.signaltareas());
    if (Filtro === 1) {
      this.filtroactual = 1;
      this.tareas.set(this.signaltareas());
    }
    if (Filtro === 2) {
      this.filtroactual = 2;
      this.tareas.update((tarea) => tarea.filter((tarea) => tarea.estado === false));
    }
    if (Filtro === 3) {
      this.filtroactual = 3;
      this.tareas.update((tarea) => {
        return tarea.filter((tarea) => tarea.estado === true)
      });
    }
  }

  todaslastareas() {
    this.signaltareas.update((tareas) =>
      tareas.map((tarea) =>
        tarea.estado === false ? { ...tarea, estado: true } : tarea
      )
    );
  }

  pendientestareas() {
    this.tareas.update((tareas) => (tareas.filter((tareas) => {
      return tareas.estado === false;
    })));
  }

  completartareas() {
    this.tareas.update((tareas) => (tareas.filter((tareas) => {
      return tareas.estado === true;
    })));
  }


}
