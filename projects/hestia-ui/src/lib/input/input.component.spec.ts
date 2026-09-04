import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HInputComponent } from './input.component';
import { HFieldComponent } from '../field/field.component';

@Component({
  standalone: true,
  imports: [HInputComponent, HFieldComponent],
  template: `
    <h-field label="Username" [error]="errorMessage()" [showErrorWhen]="showErrorWhen()">
      <h-input [invalid]="invalid()" [(touched)]="touched" />
    </h-field>
  `,
})
class TestHostComponent {
  invalid = signal(false);
  touched = signal(false);
  errorMessage = signal<string | undefined>('Required field');
  showErrorWhen = signal<'touched' | 'dirty' | 'always' | 'never'>('touched');
}

describe('HInputComponent and HFieldComponent showError behavior', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  it('does not display error in h-input or h-field when invalid is true but untouched', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(false);
    fixture.detectChanges();

    const inputWrap = fixture.nativeElement.querySelector('.h-input-wrap');
    expect(inputWrap.classList.contains('h-input-wrap--error')).toBe(false);

    const errorSpan = fixture.nativeElement.querySelector('.h-field-error');
    expect(errorSpan).toBeNull();
  });

  it('displays error in h-input and h-field when invalid is true and touched is true', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(true);
    fixture.detectChanges();

    const inputWrap = fixture.nativeElement.querySelector('.h-input-wrap');
    expect(inputWrap.classList.contains('h-input-wrap--error')).toBe(true);

    const errorSpan = fixture.nativeElement.querySelector('.h-field-error');
    expect(errorSpan).not.toBeNull();
    expect(errorSpan.textContent).toContain('Required field');
  });

  it('marks input as touched and shows error on blur when invalid', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(false);
    fixture.detectChanges();

    const inputNative = fixture.nativeElement.querySelector('input.h-input-native') as HTMLInputElement;
    inputNative.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(fixture.componentInstance.touched()).toBe(true);
    const inputWrap = fixture.nativeElement.querySelector('.h-input-wrap');
    expect(inputWrap.classList.contains('h-input-wrap--error')).toBe(true);

    const errorSpan = fixture.nativeElement.querySelector('.h-field-error');
    expect(errorSpan).not.toBeNull();
  });

  it('respects showErrorWhen="always" on h-field even if untouched', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.touched.set(false);
    fixture.componentInstance.showErrorWhen.set('always');
    fixture.detectChanges();

    const errorSpan = fixture.nativeElement.querySelector('.h-field-error');
    expect(errorSpan).not.toBeNull();
  });
});
