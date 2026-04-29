import { Injectable, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BehaviorSubject } from 'rxjs';

export type ToastTone = 'primary' | 'running' | 'error' | 'idle';

export interface Toast {
  id: string;
  tone: ToastTone;
  title: string;
  description?: string;
  action?: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private announcer = inject(LiveAnnouncer);
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(toast: Omit<Toast, 'id'>): string {
    const id = Math.random().toString(36).slice(2);
    const t: Toast = { id, duration: toast.tone === 'error' ? 0 : 5000, ...toast };
    this.toastsSubject.next([...this.toastsSubject.value, t]);
    const politeness = t.tone === 'error' ? 'assertive' : 'polite';
    this.announcer.announce(`${t.title}${t.description ? ': ' + t.description : ''}`, politeness);
    if (t.duration) setTimeout(() => this.dismiss(id), t.duration);
    return id;
  }

  dismiss(id: string) {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }

  success(title: string, description?: string) { return this.show({ tone: 'running', title, description }); }
  error(title: string, description?: string)   { return this.show({ tone: 'error',   title, description }); }
  info(title: string, description?: string)    { return this.show({ tone: 'primary', title, description }); }
  warning(title: string, description?: string) { return this.show({ tone: 'idle',    title, description }); }
}
