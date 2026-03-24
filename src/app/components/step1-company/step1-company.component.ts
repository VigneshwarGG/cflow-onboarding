import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-step1-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './step1-company.component.html',
  styleUrl: './step1-company.component.css'
})
export class Step1CompanyComponent {
  @Input() form!: FormGroup;
  @Input() teamSizes: string[] = [];
  @Input() countryCodes: any[] = [];
  @Output() next = new EventEmitter<void>();

  onContactNumberInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const numericValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = numericValue;
    this.form.get('contactNumber')?.setValue(numericValue, { emitEvent: false });
  }

  onSubmit() {
    if (this.form.valid) {
      this.next.emit();
    }
  }
}
