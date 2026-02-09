import { HttpOptions, HttpResponse } from '@capacitor/core';
import { inject, Injectable, Provider, ProviderToken } from '@angular/core';
import { MaybeAsync } from '@angular/router';
import { AsyncClassesUtil } from '@utils/async-classes.util';

@Injectable()
export class CapacitorInterceptors {
  private interceptors: CapacitorRequestInterceptor[] = [];
  private readonly asyncUtils = inject(AsyncClassesUtil);

  public static create(options: {
    interceptors: ProviderToken<CapacitorRequestInterceptor>[];
  }): Provider {
    return {
      provide: CapacitorInterceptors,
      useFactory: () => {
        const injectors = options.interceptors.map((token) => inject(token));
        const value = new CapacitorInterceptors();
        value.interceptors = injectors;
        return value;
      },
    };
  }

  async onRequest(options: HttpOptions): Promise<HttpOptions> {
    let result = options;

    for (const interceptor of this.interceptors) {
      const intercepted = interceptor.onRequest(result);
      result = await this.asyncUtils.maybeAsyncToPromise(intercepted);
    }

    return result;
  }

  async onResponse(options: HttpOptions, response: HttpResponse): Promise<HttpResponse> {
    let result = response;

    for (const interceptor of this.interceptors) {
      const intercepted = interceptor.onResponse(options, result);
      result = await this.asyncUtils.maybeAsyncToPromise(intercepted);
    }

    return result;
  }

  async onError(options: HttpOptions, error: unknown): Promise<CapacitorInterceptorError> {
    let result: CapacitorInterceptorError = { error };

    for (const interceptor of this.interceptors) {
      const intercepted = interceptor.onError(options, result.error);
      result = await this.asyncUtils.maybeAsyncToPromise(intercepted);
    }

    return result;
  }
}

export abstract class CapacitorRequestInterceptor {
  onRequest(options: HttpOptions): MaybeAsync<HttpOptions> {
    return options;
  }

  onResponse(options: HttpOptions, response: HttpResponse): MaybeAsync<HttpResponse> {
    return response;
  }

  onError(options: HttpOptions, error: unknown): MaybeAsync<CapacitorInterceptorError> {
    return { error };
  }
}

export interface CapacitorInterceptorError {
  error: unknown;
  throws?: boolean;
  retry?: boolean;
  data?: unknown;
}
