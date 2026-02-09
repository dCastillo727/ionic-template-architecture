import {
  CapacitorInterceptorError,
  CapacitorRequestInterceptor,
} from '@interface-core/capacitor-interceptors';
import { HttpOptions, HttpResponse } from '@capacitor/core';
import { MaybeAsync } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ExampleInterceptor extends CapacitorRequestInterceptor {
  override onRequest(options: HttpOptions): MaybeAsync<HttpOptions> {
    console.log('Request intercepted:', options);
    return options;
  }

  override onResponse(options: HttpOptions, response: HttpResponse): MaybeAsync<HttpResponse> {
    return response;
  }

  override onError(options: HttpOptions, error: unknown): MaybeAsync<CapacitorInterceptorError> {
    return { error };
  }
}
