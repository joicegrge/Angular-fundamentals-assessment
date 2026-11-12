import { TestBed } from '@angular/core/testing';
import { TaskService } from './task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created with seed tasks', () => {
    expect(service).toBeTruthy();
    expect(service.tasks().length).toBeGreaterThan(0);
  });

  it('should add a task and ignore blank titles', () => {
    const before = service.total();
    service.add('   ');
    expect(service.total()).toBe(before);
    service.add('New task');
    expect(service.total()).toBe(before + 1);
  });

  it('should cycle a task status and remove a task', () => {
    const first = service.tasks()[0];
    service.cycleStatus(first.id);
    expect(service.tasks()[0].status).not.toBe(first.status);
    service.remove(first.id);
    expect(service.tasks().some((t) => t.id === first.id)).toBe(false);
  });
});
