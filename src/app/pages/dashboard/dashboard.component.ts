import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from  '@angular/forms' ;
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, FormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    projetForm: FormGroup;
    selectedFile: any;

    constructor(private fb: FormBuilder) {
         this.projetForm = this.fb.group({
              id: [null],
              titre: ['', [Validators.required, Validators.minLength(7)]],
              description: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(3000)]],
              imageUrl: [''],
              likes: [0]
         });
    }

    hasError(fieldName: string, errorName: string) {
      const fieldErrors = this.projetForm.get(fieldName)?.errors;
      return fieldErrors ? fieldErrors[errorName] : false;
    }

    showErrorMessage(fieldName: string) {
      const fieldControl = this.projetForm.get(fieldName);
      if (fieldControl?.invalid && fieldControl?.touched) {
        if (this.hasError(fieldName, 'required')) {
          return 'Ce champ est requis.';
        } else if (this.hasError(fieldName, 'minlength')) {
          return 'Doit contenir au moins 7 caractères.';
        } else if (this.hasError(fieldName, 'maxlength')) {
          return 'Doit contenir moins de 3000 caractères.';
        }
      }
      return '';
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    onSubmit() {
      console.log(this.projetForm.value);
    }
}
