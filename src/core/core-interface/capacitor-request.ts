import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { CapacitorInterceptors } from '@interface-core/capacitor-interceptors';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable()
export class CapacitorRequest {
  private readonly ci = inject(CapacitorInterceptors);

  doRequest<T>(options: {
    method: keyof HttpClient;
    url: string;
    body?: unknown;
    params?: { [param: string]: string | string[] };
    headers?: { [header: string]: string };
    dataType?: 'file' | 'formData' | undefined;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  }): Observable<T> {
    const capacitorReq: HttpOptions = {
      url: options.url,
      method: options.method,
      data: options.body,
      params: options.params,
      headers: options.headers,
      dataType: options.dataType,
      responseType: options.responseType ?? 'json',
    };

    return fromPromise(this.handleRequest(capacitorReq));
  }

  private async handleRequest<T>(options: HttpOptions): Promise<T> {
    const capacitorReq = await this.ci.onRequest(options);

    try {
      const capacitorRes = await CapacitorHttp.request(capacitorReq);

      if (capacitorRes.status >= 300 || capacitorRes.status < 200) {
        throw capacitorRes;
      }

      const response = await this.ci.onResponse(capacitorReq, capacitorRes);

      return response.data as T;
    } catch (error) {
      const handledError = await this.ci.onError(options, error);

      if (handledError.throws) {
        throw handledError.error;
      }

      if (handledError.data) {
        return handledError.data as T;
      }

      if (handledError.retry) {
        return await this.handleRequest(options);
      }

      throw error;
    }
  }
}
