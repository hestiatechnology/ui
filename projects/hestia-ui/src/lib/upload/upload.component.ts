import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UploadFile {
  name: string;
  size: number;
  progress: number;
  file: File;
  error?: string;
}

@Component({
  selector: 'h-dropzone',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-dropzone-host' },
  template: `
    <div
      class="h-dropzone"
      [class.h-dropzone--active]="dragging()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <div class="h-dropzone-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
        </svg>
      </div>
      <div class="h-dropzone-text">
        Drop files or
        <button type="button" class="h-dropzone-browse" (click)="fileInput.click()">browse</button>
      </div>
      <div class="h-dropzone-hint">{{ hint() }}</div>
      <input
        #fileInput
        type="file"
        class="h-dropzone-input"
        [multiple]="multiple()"
        [accept]="accept()"
        (change)="onFileInput($event)"
        aria-hidden="true"
        tabindex="-1"
      />
    </div>

    @if (files().length > 0) {
      <div class="h-dropzone-list">
        @for (f of files(); track f.name) {
          <div class="h-dropzone-file">
            <div class="h-dropzone-file-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
            <div class="h-dropzone-file-body">
              <div class="h-dropzone-file-meta">
                <span class="h-dropzone-file-name">{{ f.name }}</span>
                <span class="h-dropzone-file-size">{{ formatSize(f.size) }}</span>
              </div>
              @if (f.error) {
                <div class="h-dropzone-file-error">{{ f.error }}</div>
              } @else {
                <div class="h-dropzone-progress-track">
                  <div class="h-dropzone-progress-fill" [style.width.%]="f.progress"></div>
                </div>
              }
            </div>
            <button
              type="button"
              class="h-dropzone-file-remove"
              (click)="removeFile(f)"
              [attr.aria-label]="'Remove ' + f.name"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    :host { display: block; }

    .h-dropzone {
      border: 1.5px dashed var(--h-border-strong); border-radius: var(--h-radius-lg);
      padding: 32px; background: color-mix(in oklch, var(--h-thread-cotton, #F5EFE2) 30%, var(--h-card));
      text-align: center; cursor: default;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  background var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-dropzone--active {
      border-color: var(--h-primary);
      background: rgba(0, 61, 165, 0.04);
    }

    .h-dropzone-icon {
      width: 44px; height: 44px; margin: 0 auto 12px;
      border-radius: var(--h-radius-md); background: var(--h-card);
      border: 1px solid var(--h-border);
      display: grid; place-items: center; color: var(--h-primary);
    }

    .h-dropzone-text {
      font-size: 14px; font-weight: 600; color: var(--h-foreground);
    }
    .h-dropzone-browse {
      background: none; border: none; color: var(--h-primary); cursor: pointer;
      font-size: inherit; font-weight: inherit; font-family: inherit;
      padding: 0; text-decoration: underline; text-underline-offset: 2px;
    }
    .h-dropzone-browse:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }

    .h-dropzone-hint {
      font-size: 12.5px; color: var(--h-muted-foreground); margin-top: 4px;
    }

    .h-dropzone-input { display: none; }

    .h-dropzone-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }

    .h-dropzone-file {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 12px; border: 1px solid var(--h-border);
      border-radius: var(--h-radius-md); background: var(--h-card);
    }

    .h-dropzone-file-icon {
      width: 32px; height: 32px; border-radius: var(--h-radius-sm);
      background: rgba(0,61,165,0.10); color: var(--h-primary);
      display: grid; place-items: center; flex-shrink: 0;
    }

    .h-dropzone-file-body { flex: 1; min-width: 0; }

    .h-dropzone-file-meta {
      display: flex; justify-content: space-between; font-size: 13px; font-weight: 500;
      gap: 8px;
    }
    .h-dropzone-file-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .h-dropzone-file-size {
      font-family: var(--h-font-mono); font-size: 11.5px; color: var(--h-muted-foreground);
      flex-shrink: 0;
    }

    .h-dropzone-file-error { font-size: 12px; color: var(--h-status-error); margin-top: 4px; }

    .h-dropzone-progress-track {
      height: 4px; border-radius: 4px; background: var(--h-muted); overflow: hidden; margin-top: 6px;
    }
    .h-dropzone-progress-fill {
      height: 100%; background: var(--h-primary); border-radius: 4px;
      transition: width var(--h-motion-product-base) var(--h-motion-product-ease);
    }

    .h-dropzone-file-remove {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: var(--h-radius-sm);
      border: none; background: none; color: var(--h-muted-foreground); cursor: pointer; flex-shrink: 0;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-dropzone-file-remove:hover { background: var(--h-muted); color: var(--h-foreground); }
    .h-dropzone-file-remove:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
  `],
})
export class HDropzoneComponent {
  readonly accept = input('');
  readonly multiple = input(true);
  readonly maxSizeMb = input(25);
  readonly hint = input('PDF, CSV, XLSX up to 25 MB · DPP attachments accepted');

  readonly files = model<UploadFile[]>([]);
  readonly filesAdded = output<File[]>();
  readonly fileRemoved = output<UploadFile>();

  protected readonly dragging = signal(false);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(false);
    const rawFiles = event.dataTransfer?.files;
    if (rawFiles) this._addFiles(Array.from(rawFiles));
  }

  onFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this._addFiles(Array.from(input.files));
    input.value = '';
  }

  removeFile(file: UploadFile) {
    this.files.update(list => list.filter(f => f !== file));
    this.fileRemoved.emit(file);
  }

  private _addFiles(rawFiles: File[]) {
    const maxBytes = this.maxSizeMb() * 1024 * 1024;
    const newFiles: UploadFile[] = rawFiles.map(f => ({
      name: f.name,
      size: f.size,
      progress: 0,
      file: f,
      error: f.size > maxBytes ? `File exceeds ${this.maxSizeMb()} MB limit` : undefined,
    }));
    this.files.update(list => [...list, ...newFiles]);
    this.filesAdded.emit(rawFiles);
  }

  protected formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
