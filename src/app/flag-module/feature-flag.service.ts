import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime, map, take
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MockFeatureFlag {
  isOn$ = new BehaviorSubject(false);

  toggle() {
    this.isOn$.pipe(take(1)).subscribe((on) => this.isOn$.next(!on));
  }
}

export interface FeatureFlags {
  checkIsOn(flag: string): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService implements FeatureFlags {
  constructor(private mockFeatureFlag: MockFeatureFlag) {}

  checkIsOn(flag: string): Observable<boolean> {
    // return http.get<Record<string, boolean>>('/api/feature-flags');
    // return of((environment?.featureFlags ?? {})[flag]);

    // for demo - allow button to toggle
    return this.mockFeatureFlag.isOn$.pipe(debounceTime(10));
  }
}


// an actual implementation that refreshes the FeatureFlags on app start
@Injectable({
  providedIn: 'root',
})
export class APIFeatureFlagService implements FeatureFlags {
  constructor(private http: HttpClient) {}

  checkIsOn(flag: string): Observable<boolean> {
    return this.http
      .get<Record<string, boolean>>('/api/feature-flags')
      .pipe(map((flags) => flags[flag]));
  }
}
