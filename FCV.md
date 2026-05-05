Custom Controls – End of ControlValueAccessor

In Reactive Forms creating a custom form control required implementing ControlValueAccessor – an interface with four methods, magical provider with forwardRef, and manual calling of onChange/onTouched. Every Angular developer knows this boilerplate:


// Reactive Forms - ControlValueAccessor 😵
@Component({
  selector: 'my-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true
    }
  ]
})
export class MyInputComponent implements ControlValueAccessor {
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  
  writeValue(value: string): void { /* ... */ }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { /* ... */ }
}

Signal Forms reduce this to one line.


FormValueControl – Minimalistic Contract

To create a control compatible with [field] directive, you just need to implement FormValueControl<T> interface:


import { Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'my-input',
  template: `
    <input 
      [value]="value()" 
      (input)="value.set($event.target.value)"
    />
  `
})
export class MyInputComponent implements FormValueControl<string> {
  readonly value = model('');
}

That’s all. One model() signal and the control is ready to use:


<my-input [field]="myForm.email"></my-input>

The [field] directive automatically synchronizes value between form and control. Change in form → value() update. Change in control → form model update.


Optional Inputs – Automatic State Binding

FormValueControl defines a number of optional inputs. If you declare them, [field] directive will automatically fill them:


@Component({
  selector: 'my-input',
  template: `
    <div class="input-wrapper" [class.has-error]="invalid()">
      <input 
        [value]="value()" 
        [disabled]="disabled()"
        [attr.name]="name()"
        (input)="value.set($event.target.value)"
        (blur)="touched.set(true)"
      />
      @if (invalid() && touched()) {
        <div class="errors">
          @for (error of errors(); track error.kind) {
            <span>{{ error.message }}</span>
          }
        </div>
      }
    </div>
  `
})
export class MyInputComponent implements FormValueControl<string> {
  // Required
  readonly value = model('');
  
  // Optional - Field will automatically bind if they exist
  readonly disabled = input(false);
  readonly touched = model(false);  // model() allows two-way binding
  readonly errors = input<ValidationError[]>([]);
  readonly invalid = input(false);
  readonly name = input('');
  readonly required = input(false);
  readonly readonly = input(false);
}

Full list of optional inputs:


disabled – whether field is disabled
readonly – whether field is read-only
touched – whether user interacted with field (can be model() for two-way binding)
dirty – whether value was changed
invalid – whether validation failed
pending – whether async validation is in progress
errors – list of validation errors
name – field name in form
required – whether field is required
min, max, minLength, maxLength, pattern – values from validators

You declare only those you need. The rest is ignored.


FormCheckboxControl – For Checkboxes

For checkbox-type controls there is a separate FormCheckboxControl contract:


import { Component, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'my-checkbox',
  template: `
    <label>
      <input 
        type="checkbox"
        [checked]="checked()" 
        (change)="checked.set($event.target.checked)"
      />
      <ng-content></ng-content>
    </label>
  `
})
export class MyCheckboxComponent implements FormCheckboxControl {
  readonly checked = model(false);
}

Usage:


<my-checkbox [field]="myForm.agreeToTerms">
  I accept the terms
</my-checkbox>

Controls as Directives

Control doesn’t have to be a component – it can be a directive on a native element:


@Directive({
  selector: 'input[myCustomInput]',
  host: {
    '[value]': 'value()',
    '(input)': 'value.set($event.target.value)',
    '(blur)': 'onBlur()'
  }
})
export class MyCustomInputDirective implements FormValueControl<string> {
  readonly value = model('');
  readonly touched = model(false);
  
  onBlur() {
    this.touched.set(true);
  }
}

<input myCustomInput [field]="myForm.email" />

The [field] directive will automatically detect FormValueControl and connect it to the form.


Signal Forms eliminate ceremony. Instead of implementing an interface with four methods and configuring providers, you declare one signal and the control works.
