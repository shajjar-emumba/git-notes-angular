import { Component, inject } from '@angular/core';
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
import { CreateFile, CreateGistData } from '../../models/interfaces';
import { GistStore } from '../../store/gists.store';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-create-gist',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatIconButton],
  templateUrl: './create-gist.component.html',
  styleUrl: './create-gist.component.scss',
})
export class CreateGistComponent {
  gistForm: FormGroup;
  gistStore = inject(GistStore);
  authStore = inject(AuthStore);

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
      const gistFiles: CreateFile = {};

      this.gistForm.value.files.forEach(
        (file: { fileName: string; content: string }) => {
          gistFiles[file.fileName] = { content: file.content };
        }
      );

      const createGistData: CreateGistData = {
        description: this.gistForm.value.description,
        public: false,
        files: gistFiles,
      };

      this.gistStore.createUserGist([
        this.authStore.user().accessToken,
        createGistData,
      ]);
    }
  }
}
