import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { FormsModule } from  '@angular/forms' ;
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


import { Observable } from 'rxjs';
import { Projet } from '../../models/projet.model';
import { AuthService } from '../../services/auth.service';
import { GalleryService } from '../../services/gallery.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule,
    FormsModule, MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatDatepickerModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  projetForm: FormGroup;
  selectedFile: any;
  isEditing: boolean = false;
  projetData!: Observable<Projet[]>;
  ngOnInit(): void {
    this.getData();
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private galleryService: GalleryService
    ) {
    this.projetForm = this.fb.group({
      id: [null],
      createdAt: [''],
      titre: ['', [Validators.required, Validators.minLength(7)]],
      description: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(3000)]],
      imageUrl: [''],
      likes: [0],
      visible: [false],
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
  //onSubmit() {
//console.log(this.projetForm.value);
//}

 // Ajoutez ce code
 saveData() {
    if (this.projetForm.valid) {
      const formData: Projet = this.projetForm.value;
      if (this.selectedFile) {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + this.selectedFile.name);
        uploadBytes(storageRef, this.selectedFile).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            formData.imageUrl = downloadURL;
            this.galleryService.saveProjet(formData).then(() => {
              this.resetForm();
            });
          });
        });
      } else {
        this.galleryService.saveProjet(formData).then(() => {
          this.resetForm();
        });
      }
    } else {
      console.log('All fields are required');
    }
  }
  getData() {
    this.projetData = this.galleryService.getProjet();
  }
  editData(data: Projet) {
    this.isEditing = true;
    this.projetForm.patchValue(data);
  }
  deleteData(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément?')) {
      this.galleryService.deleteProjet(id)
        .then(() => {
          // Traitez le succès de la suppression ici, par exemple en rafraîchissant la liste.
        })
        .catch(error => {
          // Gérez les erreurs en affichant un message d’erreur.
        console.error("Error deleting photo:", error);
        alert("Une erreur s’est produite lors de la suppression de la photo.");
      });
    }
  }
  resetForm() {
      this.projetForm.reset({ likes: 0, imageUrl: '', description: '', titre: '', createdAt: '' });
      this.selectedFile = null;
      this.isEditing = false;
    }
  navigateToDetails(id: string) {
    this.router.navigate(['/details:id']);
  }
}
