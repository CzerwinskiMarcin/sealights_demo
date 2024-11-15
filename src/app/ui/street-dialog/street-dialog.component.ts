import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-street-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './street-dialog.component.html',
  styleUrl: './street-dialog.component.scss'
})
export class StreetDialogComponent {
  public readonly data = inject<{ countryName: string }>(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef<StreetDialogComponent>);

  public onSave(cityName: string): void {
    this.dialogRef.close(cityName);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
