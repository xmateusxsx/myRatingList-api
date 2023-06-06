export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super("This category already exists")
  }
}