export abstract class Mapper<I, O> {
  abstract mapTo(param: I): O;
  abstract mapFrom(param: O): I;
}
