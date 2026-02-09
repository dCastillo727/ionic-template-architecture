import { EnvironmentProviders, Provider } from '@angular/core';
import { ExampleInterceptor } from '@interceptors/example-interceptor';
import { CapacitorInterceptors } from '@interface-core/capacitor-interceptors';

export function provideInterceptors(): (Provider | EnvironmentProviders)[] {
  const interceptors = [ExampleInterceptor];
  return [...interceptors, CapacitorInterceptors.create({ interceptors: interceptors })];
}
