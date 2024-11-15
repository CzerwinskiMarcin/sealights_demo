import { Component } from '@angular/core';
import { MatCardModule, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-invalid-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatCardHeader, MatCardContent, RouterModule],
  templateUrl: './invalid-page.component.html',
  styleUrl: './invalid-page.component.scss'
})
export class InvalidPageComponent {
}
