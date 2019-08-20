import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScenesRoutingService {
  public slug: string;
  constructor() { }

  setCurrentSlug(slug: string): string {
    return this.slug = slug;
  }
}
