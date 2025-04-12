import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  private nextId = 0;

  constructor() {}

  getToasts(): Observable<Toast[]> {
    return this.toasts.asObservable();
  }

  show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 3000
  ): void {
    const id = this.nextId++;
    const toast: Toast = { id, message, type, duration };

    // Add toast to the array
    const currentToasts = this.toasts.value;
    this.toasts.next([...currentToasts, toast]);

    // Auto-remove toast after duration
    setTimeout(() => this.remove(id), duration);
  }

  success(message: string, duration: number = 3000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 3000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration: number = 3000): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration: number = 3000): void {
    this.show(message, 'warning', duration);
  }

  remove(id: number): void {
    const currentToasts = this.toasts.value;
    this.toasts.next(currentToasts.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this.toasts.next([]);
  }
}
