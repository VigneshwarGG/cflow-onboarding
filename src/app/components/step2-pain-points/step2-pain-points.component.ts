import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-pain-points',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step2-pain-points.component.html',
  styleUrl: './step2-pain-points.component.css'
})
export class Step2PainPointsComponent {
  @Input() form!: FormGroup;
  @Input() options: string[] = [];
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  get showOtherTextarea(): boolean {
    return this.form.get('selections.Others')?.value === true;
  }

  onNext() {
    this.next.emit();
  }

  onPrev() {
    this.prev.emit();
  }
}
