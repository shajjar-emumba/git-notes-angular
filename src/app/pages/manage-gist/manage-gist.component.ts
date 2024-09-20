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
import { CreateFile, File, GistFormData } from '../../models/interfaces';
import { GistStore } from '../../store/gists.store';
import { AuthStore } from '../../store/auth.store';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-gist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatIconButton,
    JsonPipe,
  ],
  templateUrl: './manage-gist.component.html',
  styleUrl: './manage-gist.component.scss',
})
export class ManageGistComponent {
  gistForm: FormGroup;
  gistId!: string;

  private originalFiles: File[] = []; // Store original files for comparison
  private subscription$: Subscription | undefined;

  gistStore = inject(GistStore);
  authStore = inject(AuthStore);
  activatedRoute = inject(ActivatedRoute);

  constructor(private formBuilder: FormBuilder) {
    this.gistForm = this.formBuilder.group({
      description: ['', Validators.required],
      files: this.formBuilder.array([this.createFileFormGroup()]),
    });
  }

  ngOnInit() {
    this.subscription$ = this.activatedRoute.data.subscribe(({ userGists }) => {
      if (userGists) {
        this.gistId = userGists?.gist_id;
        this.originalFiles = userGists.files;
        this.populateForm(userGists);
      }
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
      const gistFiles = this.mapFilesToCreateGistFile(
        this.gistForm.value.files,
        this.originalFiles
      );
      const gistData = this.buildGistData(gistFiles);

      if (this.gistId) {
        this.updateGist(gistData);
      } else {
        console.log(gistData);
        this.createGist(gistData);
      }
    }
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  private mapFilesToCreateGistFile(files: File[], originalFiles: any[]) {
    const gistFiles: CreateFile = {};

    files.forEach((file) => {
      gistFiles[file.fileName] = { content: file.content };
    });

    // Handle file deletions because according to docs the content should be null if the file is deleted

    originalFiles.forEach((originalFile) => {
      if (!files.find((file) => file.fileName === originalFile.fileName)) {
        gistFiles[originalFile.fileName] = null;
      }
    });

    console.log(gistFiles);
    return gistFiles;
  }

  private buildGistData(gistFiles: CreateFile) {
    return {
      description: this.gistForm.value.description,
      files: gistFiles,
    };
  }

  private populateForm(filesData: GistFormData) {
    this.gistForm.patchValue({
      description: filesData.description,
    });

    const filesArray = this.gistForm.get('files') as FormArray;
    filesArray.clear();

    filesData.files.forEach((file: any) => {
      const fileGroup = this.formBuilder.group({
        fileName: [file.filename, Validators.required],
        content: [file.content, Validators.required],
      });

      this.files.push(fileGroup);
    });

    this.originalFiles = filesData.files.map((file: any) => ({
      fileName: file.filename,
      content: file.content,
    }));
  }

  private createFileFormGroup() {
    return this.formBuilder.group({
      fileName: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  private updateGist(gistData: any) {
    const updateGistData = { ...gistData, gist_id: this.gistId };
    this.gistStore.updateUserGist([
      this.authStore.user().accessToken,
      this.gistId,
      updateGistData,
    ]);
  }

  private createGist(gistData: any) {
    const createGistData = { ...gistData, public: false };
    this.gistStore.createUserGist([
      this.authStore.user().accessToken,
      createGistData,
    ]);
  }
}
