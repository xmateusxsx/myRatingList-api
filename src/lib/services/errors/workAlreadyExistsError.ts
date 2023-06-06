export class WorkAlreadyExistsError extends Error {
  constructor() {
    super("This work already exists")
  }
}