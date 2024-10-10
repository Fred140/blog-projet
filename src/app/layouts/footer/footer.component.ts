import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  footerClass$: Observable<string> | undefined;


  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.footerClass$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches ? 'footer-handset' : 'footer-web')
      );
  }
}
