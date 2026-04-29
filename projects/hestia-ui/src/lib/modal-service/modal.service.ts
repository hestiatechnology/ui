import {
  ApplicationRef,
  Injectable,
  Injector,
  Type,
  createComponent,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { H_MODAL_DATA, HModalRef } from './modal-ref';
import { HModalContainerComponent } from './modal-container.component';

export interface HModalConfig<D = unknown> {
  data?: D;
  size?: 'sm' | 'default' | 'lg' | 'xl';
  closeable?: boolean;
  title?: string;
}

@Injectable({ providedIn: 'root' })
export class HModalService {
  private readonly _appRef   = inject(ApplicationRef);
  private readonly _injector = inject(Injector);
  private readonly _document = inject(DOCUMENT);

  open<T, R = unknown, D = unknown>(
    component: Type<T>,
    config?: HModalConfig<D>,
  ): HModalRef<R> {
    const modalRef = new HModalRef<R>();

    const childInjector = Injector.create({
      providers: [
        { provide: H_MODAL_DATA, useValue: config?.data ?? null },
        { provide: HModalRef, useValue: modalRef },
      ],
      parent: this._injector,
    });

    const containerRef = createComponent(HModalContainerComponent, {
      environmentInjector: this._appRef.injector,
      elementInjector: childInjector,
    });

    containerRef.instance.componentType = component;
    containerRef.instance.size      = config?.size ?? 'default';
    containerRef.instance.closeable = config?.closeable !== false;
    containerRef.instance.title     = config?.title;

    modalRef._setCloseCallback(() => {
      containerRef.instance._closeDialog();
      this._appRef.detachView(containerRef.hostView);
      containerRef.destroy();
      (containerRef.location.nativeElement as Element).remove();
    });

    this._appRef.attachView(containerRef.hostView);
    this._document.body.appendChild(containerRef.location.nativeElement);
    containerRef.changeDetectorRef.detectChanges();

    return modalRef;
  }
}
