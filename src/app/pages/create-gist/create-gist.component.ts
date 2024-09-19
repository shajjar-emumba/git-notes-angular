import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-gist',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatIconButton],
  templateUrl: './create-gist.component.html',
  styleUrl: './create-gist.component.scss',
})
export class CreateGistComponent {
  gistForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.gistForm = this.formBuilder.group({
      description: ['', Validators.required],
      files: this.formBuilder.array([this.createFileFormGroup()]),
    });
  }

  createFileFormGroup() {
    return this.formBuilder.group({
      fileName: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  get files() {
    return this.gistForm.get('files') as FormArray;
  }

  addFile() {
    this.files.push(this.createFileFormGroup());
  }

  removeFile(index: number) {
    this.files.removeAt(index);
  }

  submitGist() {
    if (this.gistForm.valid) {
    }
  }
}
