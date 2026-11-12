import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';
import { TaskService } from '../../services/task';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one list item per task using @for', () => {
    const service = TestBed.inject(TaskService);
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '[data-testid="task-list"] li',
    );
    expect(items.length).toBe(service.tasks().length);
  });
});
