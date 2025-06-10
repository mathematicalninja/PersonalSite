---
slug: resultTypes
link: '/content/resultTypes'
title: Meandering with result types
blurb: "A walk through some of the issues I've had with handling, possible undefined, result types."
---

I made the following VsCode snippet:

"Turn return T | undefined into success/error paradime": {
"prefix": "err",
"body": [
"{success:true, ${1:result: ${TM_SELECTED_TEXT}}}|{success:false,error:string}"
],
"description": "Turns a return type of T | undefined into a success/error paradigm."
}

Then I realised what I was doing was just stealing Result<T> from golang.

So I just defined:

export type Result<T> =
| { success: true; result: T }
| { success: false; error: string }

and I swapped the snippet to:

    "Turn return T | undefined into success/error paradime": {
        "prefix": "err",
        "body": ["Result<${TM_SELECTED_TEXT}>"],
        "description": "Turns a return type of T | undefined into a success/error paradigm."
    }

I've since modified the error types to inclue a bit more structure, allowing me to pass chains of errors.

```ts
export type Result<T> =
    | { success: true; result: T }
    | {
          success: false
          result?: T
          error: Array<string>
          source: Array<string>
      }
```

with

```ts
type ResultsFail<T>
```

being an alias for the `success:false` portion.

And I have built a (rudimentary) error stacking function.

```ts
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
```

All of this lets me have a very clean syntax for error handling:

```ts
const answer: Result<answer> = getResult(question)
if (!answer.success) {
    addErrorToStack({ stack: answer, err: FAIL_RESULT })
}
return answer.result
```

Where `FAIL_RESULT` is some defined "fail-state" that can be used in tracing the error.
Even more complex error handling can be done, and I do intend to refactor this so the error stack is a genuine stack (i.e. array) with each entry being a more complex error object.
