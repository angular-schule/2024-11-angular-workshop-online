import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, isFormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';

const passwordValidator: ValidatorFn = (ctrl: AbstractControl) => {
  if (!isFormGroup(ctrl)) {
    return null;
  }

  const pw1 = ctrl.get('pw1')?.value;
  const pw2 = ctrl.get('pw2')?.value;

  if (pw1 === pw2) {
    return null;
  } else {
    return { password: true }
  }
}


@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  private bs = inject(BookStoreService);
  private router = inject(Router);

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(80)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),
    /*password: new FormGroup({
      pw1: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      }),
      pw2: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      })
    }, { validators: [passwordValidator] })*/
  });

  isInvalid(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  hasError(control: FormControl, errorCode: string): boolean {
    // prüfen, ob das Control den bestimmten Fehler besitzt
    return control.hasError(errorCode) && control.touched;
  }


  submitForm() {
    if (this.bookForm.invalid) {
      return;
    }

    const newBook: Book = this.bookForm.getRawValue();

    this.bs.create(newBook).subscribe((receivedBook) => {
      this.router.navigate(['/books', receivedBook.isbn]);
    });

    /*
    TODO
    - wenn Formular invalid, dann Button deaktivieren
    - this.bookForm: Wert auslesen => Buch
    - HTTP Buch anlegen
    - wegnavigieren, z.B. zur Detailseite
    */
  }
}
