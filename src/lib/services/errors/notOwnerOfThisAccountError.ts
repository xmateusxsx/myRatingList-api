export class NotOwnerOfThisAccountError extends Error {
  constructor() {
    super("You are not the owner of this account")
  }
}