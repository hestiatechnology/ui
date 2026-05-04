import { InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const H_MODAL_DATA = new InjectionToken<unknown>('H_MODAL_DATA');

export type HModalCloseReason = 'confirm' | 'cancel' | 'backdrop' | 'escape' | 'programmatic';

export interface HModalCloseEvent<R = unknown> {
  reason: HModalCloseReason;
  result: R | undefined;
}

export class HModalRef<R = unknown> {
  private readonly _afterClosed$  = new Subject<R | undefined>();
  private readonly _closed$       = new Subject<HModalCloseEvent<R>>();
  private readonly _backdropClick$ = new Subject<void>();
  private readonly _keydown$       = new Subject<KeyboardEvent>();

  private _closeCallback?: () => void;

  afterClosed(): Observable<R | undefined> {
    return this._afterClosed$.asObservable();
  }

  closed(): Observable<HModalCloseEvent<R>> {
    return this._closed$.asObservable();
  }

  backdropClicked(): Observable<void> {
    return this._backdropClick$.asObservable();
  }

  keydownEvents(): Observable<KeyboardEvent> {
    return this._keydown$.asObservable();
  }

  close(result?: R): void {
    this.closeWithReason('programmatic', result);
  }

  closeWithReason(reason: HModalCloseReason, result?: R): void {
    if (this._afterClosed$.closed) return;
    this._closeCallback?.();
    this._closed$.next({ reason, result });
    this._afterClosed$.next(result);
    this._closed$.complete();
    this._afterClosed$.complete();
    this._backdropClick$.complete();
    this._keydown$.complete();
  }

  /** @internal */
  _setCloseCallback(cb: () => void): void {
    this._closeCallback = cb;
  }

  /** @internal */
  _emitBackdropClick(): void {
    if (!this._backdropClick$.closed) this._backdropClick$.next();
  }

  /** @internal */
  _emitKeydown(e: KeyboardEvent): void {
    if (!this._keydown$.closed) this._keydown$.next(e);
  }
}
