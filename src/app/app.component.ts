import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { Step1CompanyComponent } from './components/step1-company/step1-company.component';
import { Step2PainPointsComponent } from './components/step2-pain-points/step2-pain-points.component';
import { Step3DepartmentsComponent } from './components/step3-departments/step3-departments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Step1CompanyComponent,
    Step2PainPointsComponent,
    Step3DepartmentsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentStep = 1;

  // Step 1
  setupForm: FormGroup;
  teamSizes: string[] = ['0 - 10', '11 - 50', '51 - 100', '100 - 500', '500+'];
  countryCodes = [
    { code: '+91', label: 'IN (+91)' },
    { code: '+1', label: 'US (+1)' },
    { code: '+44', label: 'UK (+44)' },
  ];

  // Step 2
  painPointsForm: FormGroup;
  painPointOptions: string[] = [
    'Manual Approvals',
    'Email Threads',
    'Process Blindspots',
    'Approval Delays',
    'Audit Risk',
    'Spreadsheet Tracking',
    'Others',
  ];

  // Step 3
  departmentsForm: FormGroup;
  departmentsOptions: string[] = [
    'Operations',
    'Finance',
    'IT',
    'Healthcare',
    'Insurance',
    'Retail & Ecommerce',
    'Legal',
    'Energy & Utilities',
    'Real Estate',
    'Sales & Marketing',
    'Higher Education',
    'Logistics',
    'Nonprofit',
    'Procurement',
    'HR & Admin',
    'Solutions',
  ];

  constructor(private fb: FormBuilder) {
    this.setupForm = this.fb.group({
      teamSize: ['11 - 50', Validators.required],
      companyName: ['', Validators.required],
      countryCode: ['+91', Validators.required],
      contactNumber: ['', Validators.required],
    });

    const painPointsControls: any = {};
    this.painPointOptions.forEach((option) => {
      painPointsControls[option] = [false];
    });

    this.painPointsForm = this.fb.group({
      selections: this.fb.group(painPointsControls),
      otherDetails: [''],
    });

    const departmentsControls: any = {};
    this.departmentsOptions.forEach((option) => {
      departmentsControls[option] = [false];
    });

    this.departmentsForm = this.fb.group({
      selections: this.fb.group(departmentsControls),
    });
  }

  nextStep() {
    if (this.currentStep === 1 && this.setupForm.valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      this.currentStep = 3;
    } else if (this.currentStep === 3) {
      console.log('Final Submission', {
        step1: this.setupForm.value,
        step2: this.painPointsForm.value,
        step3: this.departmentsForm.value,
      });
      alert('Setup Complete! Check console for submission payload.');
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getStepIllustration(): string {
    switch (this.currentStep) {
      case 2:
        return 'step-2.svg';
      case 3:
        return 'step-3.svg';
      default:
        return 'step-1.svg';
    }
  }

  getStepHeroTitle(): string {
    switch (this.currentStep) {
      case 2:
        return 'Identify the friction';
      case 3:
        return 'Tailored for your team';
      default:
        return 'Welcome to Cflow';
    }
  }

  getStepHeroDescription(): string {
    switch (this.currentStep) {
      case 2:
        return 'Tell us about the manual tasks slowing you down, and we\'ll show you how to automate them in minutes.';
      case 3:
        return 'Pick your department to unlock dozens of pre-built workflows designed specifically for your industry.';
      default:
        return 'Setting up your company details helps us customize your automation experience from day one.';
    }
  }
}
