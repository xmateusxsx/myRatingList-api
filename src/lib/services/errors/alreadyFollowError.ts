export class AlreadyFollowError extends Error {
  constructor() {
    super("You already follow this user")
  }
}