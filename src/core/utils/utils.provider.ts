import { CheckObjectUtil } from '@utils/check-empty-object.util';
import { EnvironmentProviders, Provider } from '@angular/core';
import { AsyncClassesUtil } from '@utils/async-classes.util';

export function provideUtils(): (Provider | EnvironmentProviders)[] {
  return [CheckObjectUtil, AsyncClassesUtil];
}
