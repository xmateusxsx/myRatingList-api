export class AuthorAlreadyExistsError extends Error {
  constructor() {
    super("This author already exists")
  }
}