import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryProjetComponent } from './gallery-projet.component';

describe('GalleryProjetComponent', () => {
  let component: GalleryProjetComponent;
  let fixture: ComponentFixture<GalleryProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
