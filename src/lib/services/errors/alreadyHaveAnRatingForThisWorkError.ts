export class AlreadyHaveAnRatingForThisWorkError extends Error {
  constructor() {
    super("You already have an rating for this work")
  }
}