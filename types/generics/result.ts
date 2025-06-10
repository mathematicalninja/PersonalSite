export type Result<T, InputType = undefined> =
    | { success: true; result: T }
    | {
          success: false
          result?: T
          error: Array<string>
          source: ErrorSource
          input?: InputType
      }

// TODO: add in optional inputType.
// Goal: Result<T,InputType> ==> fail:{input:InputType, ...ResultFail<T>}

export type ResultFail<T> = {
    success: false
    error: Array<string>
    source: ErrorSource
}

export type ErrorSource = Array<string>

/**
 * mutates the oldError in place by appending newError to it.
 */
export function addErrorToStack<T>({
    stack,
    err,
}: {
    stack: ResultFail<T>
    err: ResultFail<T>
}): ResultFail<T> {
    stack.error.concat(err.error)
    stack.source.concat(stack.source)
    return stack
}
