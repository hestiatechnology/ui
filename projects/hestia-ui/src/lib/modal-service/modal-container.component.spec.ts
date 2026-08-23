import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HModalContainerComponent } from './modal-container.component';
import { HModalRef } from './modal-ref';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<p>Modal service content</p>`,
})
class DemoModalContentComponent {}

describe('HModalContainerComponent', () => {
  beforeAll(() => {
    if (!HTMLDialogElement.prototype.showModal) {
      Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
        configurable: true,
        value(this: HTMLDialogElement) {
          this.open = true;
        },
      });
    }

    if (!HTMLDialogElement.prototype.close) {
      Object.defineProperty(HTMLDialogElement.prototype, 'close', {
        configurable: true,
        value(this: HTMLDialogElement) {
          this.open = false;
        },
      });
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HModalContainerComponent],
      providers: [HModalRef],
    }).compileComponents();
  });

  it('renders modal content inside the default body wrapper', () => {
    const fixture = TestBed.createComponent(HModalContainerComponent);
    fixture.componentInstance.componentType = DemoModalContentComponent;
    fixture.componentInstance.title = 'Modal title';

    fixture.detectChanges();

    const body = fixture.nativeElement.querySelector('.h-modal-sc-body');

    expect(body).toBeTruthy();
    expect(body.textContent).toContain('Modal service content');
  });
});
