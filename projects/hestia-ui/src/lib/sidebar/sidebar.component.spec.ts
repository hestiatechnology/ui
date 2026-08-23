import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  HSidebarComponent,
  HSidebarGroupComponent,
  HSidebarItemComponent,
} from './sidebar.component';

@Component({
  standalone: true,
  imports: [HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <h-sidebar (navigate)="onNavigate($event)">
      <h-sidebar-group label="Main">
        <h-sidebar-item label="Dashboard" value="dashboard" (clicked)="onItemClicked($event)" />
        <h-sidebar-item label="Orders" value="orders" />
      </h-sidebar-group>
    </h-sidebar>
  `,
})
class SidebarHostComponent {
  lastNavigate?: string;
  lastItemClick?: string;

  onNavigate(value: string): void {
    this.lastNavigate = value;
  }

  onItemClicked(value: string): void {
    this.lastItemClick = value;
  }
}

describe('HSidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarHostComponent],
    }).compileComponents();
  });

  it('emits item clicked output with its value', () => {
    const fixture = TestBed.createComponent(SidebarHostComponent);
    fixture.detectChanges();

    const firstItemButton = fixture.nativeElement.querySelector(
      'h-sidebar-item .h-sidebar-item',
    ) as HTMLButtonElement;

    firstItemButton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.lastItemClick).toBe('dashboard');
  });

  it('forwards child item click through sidebar navigate output', () => {
    const fixture = TestBed.createComponent(SidebarHostComponent);
    fixture.detectChanges();

    const secondItemButton = fixture.nativeElement.querySelectorAll(
      'h-sidebar-item .h-sidebar-item',
    )[1] as HTMLButtonElement;

    secondItemButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.lastNavigate).toBe('orders');
  });
});
