import { Inject, Injectable } from '@angular/core';
import { IFigureItem, mapToFigureItem } from './figure-item.model';
import { LOCAL_STORAGE_DATA_KEY } from './providers';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: IFigureItem[] = [];

  constructor(@Inject(LOCAL_STORAGE_DATA_KEY) private key: string) {
    this.unstashData();
  }

  addFigureItem(figureItem: IFigureItem): void {
    this.data.push(figureItem);
  }

  removeFigureItem(id: string): void {
    this.data.splice(this.data.findIndex((item) => item.id === id), 1);
  }

  public stashData(): void {
    window.localStorage.setItem(this.key, JSON.stringify(this.data));
    console.info(`stashed ${this.data.length} items successfully.`)
  }

  public unstashData(): void {
    const items: string | null = window.localStorage.getItem(this.key);
    this.data = items ? JSON.parse(items).map((item: any) => mapToFigureItem(item)) : [];
  }

}
