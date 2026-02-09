import { Signal, WritableSignal } from '@angular/core';

type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type ViewState<T> = Prettify<{
  readonly [P in keyof T]: T[P] extends WritableSignal<infer U>
    ? Signal<U>
    : T[P] extends Signal<infer A>
    ? Signal<A>
    : never;
}>;
