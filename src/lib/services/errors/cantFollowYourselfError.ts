export class CantFollowYourselfError extends Error {
  constructor() {
    super("You cant follow yourself")
  }
}