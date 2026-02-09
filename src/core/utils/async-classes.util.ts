import { MaybeAsync } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

export class AsyncClassesUtil {
  constructor() {}

  maybeAsyncToPromise<T>(value: MaybeAsync<T>): Promise<T> {
    if (value instanceof Promise) {
      return value;
    } else if (value instanceof Observable) {
      return firstValueFrom(value);
    } else {
      return Promise.resolve(value);
    }
  }
}
