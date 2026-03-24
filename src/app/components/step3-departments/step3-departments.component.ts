import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step3-departments.component.html',
  styleUrl: './step3-departments.component.css'
})
export class Step3DepartmentsComponent {
  @Input() form!: FormGroup;
  @Input() options: string[] = [];
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  onNext() {
    this.next.emit();
  }

  onPrev() {
    this.prev.emit();
  }
}
