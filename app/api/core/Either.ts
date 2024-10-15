interface Left<A> {
  value: A;
  tag: "left";
}

interface Right<B> {
  value: B;
  tag: "right";
}
export type Either<A, B> = Left<A> | Right<B>;

export function isLeft<A, B>(val: Either<A, B> | B): val is Left<A> {
  if ((val as Left<A>).tag === "left") return true;
  return false;
}

export function isRight<A, B>(val: Either<A, B> | B): val is Right<B> {
  if ((val as Right<B>).tag === "right") return true;
  return false;
}

export function Left<A>(val: A): Left<A> {
  return { value: val, tag: "left" };
}

export function Right<B>(val: B): Right<B> {
  return { value: val, tag: "right" };
}

export type Predicate<N> = (val: N) => boolean;

export function predicateEither<A, B>(
  value: B,
  error: A,
  predicate: Predicate<B>,
): Either<A, B> {
  if (!predicate(value)) return Left(error);
  return Right(value);
}

export type Pair<A, B> = [A, B];

export function firstLeft<A, B>(
  val: B,
  predicatePairs: Pair<Predicate<B>, A>[],
): Either<A, B> {
  for (let i = 0; i < predicatePairs.length; i++) {
    const [predicate, message] = predicatePairs[i];
    if (!predicate(val)) return Left(message);
  }
  return Right(val);
}
