import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
      projet: any;
      location = inject(Location);

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const docRef = doc(this.firestore, 'projet', id);
      getDoc(docRef).then((docProjet) => {
        if (docProjet.exists()) {
          this.projet = docProjet.data();
        } else {
          console.log('No document found');
        }
      });
    }
  }

   back() {
    this.location.back()
   }
}
