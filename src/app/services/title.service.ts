import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private _title$ = new BehaviorSubject<string>(document.title || '');
  readonly title$ = this._title$.asObservable();

  constructor(private title: Title) {}

  setTitle(newTitle: string) {
    this._title$.next(newTitle);
    this.title.setTitle(newTitle);
  }

  getTitle(): string {
    return this._title$.getValue();
  }
}
