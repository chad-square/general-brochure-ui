import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHeadingComponent } from './component-heading.component';

describe('ComponentHeadingComponent', () => {
  let component: ComponentHeadingComponent;
  let fixture: ComponentFixture<ComponentHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentHeadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
