---
slug: code/errorWriting
link: '/content/code/errorWriting'
title: Notes on writing errors
blurb: "Some notes I've taken about writing errors."
---

from google's developer's technical writing (https://developers.google.com/tech-writing/error-messages/summary):

```
This course recommended the following best practices when writing error messages:

-   Identify the cause of the error.
-   -   If the user entered an invalid value, specify the invalid value.
-   -   Specify requirements and constraints, such as required permissions or minimum RAM.
-   Explain how to fix the problem.
-   -   When appropriate, provide an example to help demonstrate the fix.
-   Write clearly.
-   -   Be concise, not wordy. However, don't be so concise that the resulting error message becomes cryptic.
-   -   Avoid double negatives and exceptions to exceptions.
-   -   Aim the message at the appropriate target audience. Words appropriate for software engineers are often inappropriate for non-technical users.
-   -   Use terminology consistently. For example, don't use the term directory in one part of an error message and a folder in another part.
-   -   Format long error messages carefully, possibly using progressive disclosure or links to expanded documentation.
-   -   Set a positive tone.
-   -   Don't be overly apologetic.

```

https://google.github.io/styleguide/go/best-practices#when-to-panic

```

When to panic
The standard library panics on API misuse. For example, reflect issues a panic in many cases where a value is accessed in a way that suggests it was misinterpreted. This is analogous to the panics on core language bugs such as accessing an element of a slice that is out of bounds. Code review and tests should discover such bugs, which are not expected to appear in production code. These panics act as invariant checks that do not depend on a library, as the standard library does not have access to the levelled log package that the Google codebase uses.

Another case in which panics can be useful, though uncommon, is as an internal implementation detail of a package which always has a matching recover in the callchain. Parsers and similar deeply nested, tightly coupled internal function groups can benefit from this design, where plumbing error returns adds complexity without value.

The key attribute of this design is that these panics are never allowed to escape across package boundaries and do not form part of the package’s API. This is typically accomplished with a top-level deferred function that uses recover to translate a propagated panic into a returned error at the public API boundary. It requires the code that panics and recovers to distinguish between panics that the code raises itself and those that it doesn’t:

```
