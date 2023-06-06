export class InvalidRatingValue extends Error {
  constructor() {
    super("You can rate only between 0 and 100")
  }
}