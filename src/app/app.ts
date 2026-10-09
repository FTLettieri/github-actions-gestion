import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly count = signal(0);

  protected readonly todos = signal<string[]>([]);
  protected readonly todoCount = computed(() => this.todos().length);

  increment() {
    this.count.update((c) => c + 1);
  }

  decrement() {
    this.count.update((c) => c - 1);
  }

  reset() {
    this.count.set(0);
  }

  addTodo(input: HTMLInputElement) {
    const text = input.value.trim();
    if (!text) return;
    this.todos.update((list) => [...list, text]);
    input.value = '';
  }

  removeTodo(index: number) {
    this.todos.update((list) => list.filter((_, i) => i !== index));
  }
}
