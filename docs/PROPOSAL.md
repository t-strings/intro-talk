Python 3.14 introduces t-strings: template string literals that look like f-strings but evaluate to a `Template` instance instead of a `str`. This opens up exciting possibilities for safer string processing (avoiding injection vulnerabilities in SQL and HTML) and powerful custom formatting (like HTML templating directly in Python), all while using the familiar f-string syntax developers already know and love.

In this talk, I'll describe what t-strings are and how they differ from f-strings and other common Python formatting tools. I'll explore when they're a good fit for new projects and how to use them effectively in everyday code. I'll also demonstrate two libraries — `tdom` (HTML) and `t-sql` (SQL) — and close with a live tooling demo in VS Code showing the current state of formatting, linting, and syntax highlighting support.

Attendees will leave knowing when to reach for t-strings, how to adopt them safely, and which tools can improve their developer experience.

Talk Outline:

1. Introduction & Overview (1 minute)
2. What are t-strings? (5 minutes)
   - They look like f-strings, but they evaluate to a new type, `Template`
   - Unlike f-strings, they let you access the static and the substituted (interpolated) parts of the string
   - They adopt the lesser-known parts of f-strings, too, including format specs and conversions (we'll revisit this later)
   - They don't replace f-strings or any other formatting technique (str.format, etc); they're additive and new
3. Why are t-strings? (3 minutes)
   - Injection attacks (SQL injection, cross-site scripting in HTML)
   - Custom syntaxes (DSLs, convenience shortcuts for instance in HTML templates, etc.)
4. First example of writing code to process t-strings (5 minutes)
   - Simple t-string processing function example to get our heads wrapped around the basics
   - Using all the parts of f-strings, including conversions and format specs
5. What can you do with t-string libraries? (5 minutes)
   - `t-sql` makes writing SQL strings with substitutions safe and easy (quick examples to give a taste of what's possible)
   - `tdom` makes writing HTML strings with substitutions safe and easy (quick examples again)
6. What about tools for t-strings -- short live coding demo? (5 minutes)
   - t-linter for syntax highlighting and basic linting of HTML content t-strings in VS Code
   - fork of ruff that supports formatting of HTML content inside t-strings
7. Closing remarks (1 minute)
