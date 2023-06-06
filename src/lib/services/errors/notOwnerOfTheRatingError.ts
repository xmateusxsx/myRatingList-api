export class NotOwnerOfTheRatingError extends Error {
  constructor() {
    super("You are not the owner of this rating")
  }
}