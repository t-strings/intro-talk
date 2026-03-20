---
theme: default
transition: slide-left
title: "t-strings: f-strings with superpowers"
colorSchema: dark
layout: default
mdc: true
---

<h1 class="centered"><strong>t-strings:</strong><br />f-strings with superpowers</h1>

---

# Hi, I'm **Dave Peck**.

I'm an independent software developer based in sunny Seattle, Washington. <span class="little">~~☔️~~</span>

---

# Let's talk **PEP 750**!

<div v-click><p>Better known as <strong>Template Strings</strong></p></div>
<div v-click><p>...maybe <i>best</i> known as <strong>t-strings</strong></p></div>

---

# A gentle tour:

<div v-click><p><strong>What</strong> are t-strings?</p></div>
<div v-click><p><strong>Why</strong> are t-strings?</p></div>
<div v-click><p><strong>How</strong> do I use t-strings?</p></div>
<div v-click><p><strong>What's</strong> next in t-strings?</p></div>

---

# What are **t-strings**?

<div v-click><p>New feature in <strong>Python 3.14</strong></p></div>
<div v-click><p>They're like f-strings with <strong>superpowers</strong></p></div>
<div v-click><p>They help make f-strings <strong>safer</strong></p></div>
<div v-click><p>They help make f-strings more <strong>flexible</strong></p></div>

---

# They're **like** f-strings

---

# The **same syntax**

````md magic-move
```python314
name = "World"
greeting = f"Hello, {name}!"
```
```python314
name = "World"
greeting = t"Hello, {name}!"
```
````

---

# Really, the **same syntax**

````md magic-move
```python314
price = 14.95
caption = f"For only ${price:.2f}!"
```
```python314
price = 14.95
caption = t"For only ${price:.2f}!"
```
````

---
transition: fade
---

# Both are **eagerly evaluated**

```python314
friend = "World"
greeting = f"Hello, {friend}!"
template = t"Hello, {friend}!"
```

---

# Both are **eagerly evaluated**

```python314
# friend = "World"
greeting = f"Hello, {friend}!" # 💣
template = t"Hello, {friend}!" # 💣
```

---

# F-strings with **superpowers**

---

# F-strings are **plain strings**

<div v-click>
```python314
name = "world"
type(f"Hello, {name}!")
# <class 'str'>
```
</div>

---

# T-strings are **not strings**

<div v-click><p>You write them like they <i>are</i>...</p></div>
<div v-click>
```python314
t"This is not a string"
```
</div>
<div v-click><p>But they evaluate to a new type, <code>Template</code></p></div>
<div v-click><p><code>string.templatelib.Template</code></p></div>


---
transition: fade
---

# The `Template` type

<div v-click><p>Gives you access to the <strong>parts</strong> of your string</p></div>

<div v-click><p>&ndash; The <strong>static</strong> parts</p></div>

<div v-click><p>&ndash; The <strong>{substituted}</strong> parts</p></div>

---
transition: fade
---

# The `Template` type

<div><p>Gives you access to the <strong>parts</strong> of your string</p></div>
<div><p>&ndash; The <strong>static</strong> parts</p></div>
<div><p>&ndash; The <strong>{interpolated}</strong> parts</p></div>


---

# Let's look **inside** a Template

````md magic-move
```python314
name = "world"
template = t"Hi {name}!"
```
```python314
name = "world"
template = t"Hi {name}!"
list(template)
# ["Hi ", Interpolation("world"), "!"]
```
````

---

# And **inside** an Interpolation

````md magic-move
```python314
name = "world"
t = t"Hi {name}!"
```
```python314
name = "world"
t = t"Hi {name}!"
t.interpolations[0].value # "world"
```
````

---

# lower UPPER, Inc.

<div class="smaller">
````md magic-move
```python314
name = "world"
template = t"Hello {name}"
```
```python314
name = "world"
template = t"Hello {name}"
parts: list[str] = []
for item in template:
	...
```
```python314
name = "world"
template = t"Hello {name}"
parts: list[str] = []
for item in template:
	if isinstance(item, str):
		parts.append(item.lower())
```
```python314
name = "world"
template = t"Hello {name}"
parts: list[str] = []
for item in template:
	if isinstance(item, str):
		parts.append(item.lower())
	else:
		parts.append(item.value.upper())
```
```python314
name = "world"
template = t"Hello {name}"
parts: list[str] = []
for item in template:
	if isinstance(item, str):
		parts.append(item.lower())
	else:
		parts.append(item.value.upper())
result = "".join(parts)
# "hello WORLD"
```
````
</div>

---

# **Processing** templates

<div v-click>
<p>Templates are <strong>normal</strong> Python objects</p>
</div>
<div v-click>
<p>You can write or call code to:</p>
</div>
<div v-click>
<p>&ndash; Turn them into a <code>str</code></p>
</div>
<div v-click>
<p>&ndash; Turn them into any <i>other</i> type</p>
</div>

---

# Yes, but **why**?

<div v-click><p>Let's talk about f-strings...</p></div>

---

# F-strings get used a **lot**!

---
layout: image-right
image: /img/f-strings-awesome.png
backgroundSize: contain
---

# F-strings **rock**:

&ndash; Powerful

&ndash; Readable

&ndash; Elegant syntax


---
layout: image-right
image: /img/f-strings-dangerous.png
backgroundSize: contain
---

# F-strings get **misused**:

&ndash; SQL injection

&ndash; XSS in HTML

&ndash; etc.


---

# T-strings make strings **safer**

---
layout: image
image: /img/bobby-tables-from-xkcd-by-randall-munroe.png
backgroundSize: contain
---

<div class="bottom-out centered"><p>(with apologies to randall munroe)</p></div>

---

# Little Bobby Tables

<div class="smaller">
````md magic-move
```python314
from db import execute

def get_student(name: str):
    return execute(
        f"SELECT * FROM students WHERE name = '{name}'"
    )
```
```python314
from db import execute

def get_student(name: str):
    return execute(
        f"SELECT * FROM students WHERE name = '{name}'"
    )

get_student("John")
```
```python314
from db import execute

def get_student(name: str):
    return execute(
        f"SELECT * FROM students WHERE name = '{name}'"
    )

get_student("Robert'); DROP TABLE students;--")  # ☠️ ☠️ ☠️
```
```python314
from db import execute_t

def get_student(name: str):
    return execute_t(
        t"SELECT * FROM students WHERE name = '{name}'"
    )

get_student("Robert'); DROP TABLE students;--")  # 🎉 🦄 👍
```
````
</div>

---

# T-strings make strings **flexible**


---

# Doing **cool stuff** with t-strings


---
transition: wtf-enter
---

# But first: time for a **side quest**


---
layout: image
image: /img/f-strings-wtf.png
---



---

Wow




---

# How do I **process** t-strings?

<div v-click><p>Let's write a real processing function</p></div>

---

# Re-implementing **f-strings**

<div class="smaller">
````md magic-move
```python314
from string.templatelib import Template, Interpolation

def f(template: Template) -> str:
    parts = []
    for item in template:
        match item:
            case str() as s:
                parts.append(s)
            case Interpolation(value, _, conv, spec):
                ...
    return "".join(parts)
```
```python314
from string.templatelib import Template, Interpolation

def convert(value, conversion):
    if conversion == "a": return ascii(value)
    if conversion == "r": return repr(value)
    if conversion == "s": return str(value)
    return value

def f(template: Template) -> str:
    parts = []
    for item in template:
        match item:
            case str() as s:
                parts.append(s)
            case Interpolation(value, _, conv, spec):
                value = convert(value, conv)
                value = format(value, spec)
                parts.append(value)
    return "".join(parts)
```
````
</div>

---

# Let's **test** it

```python314
name = "World"
value = 42

templated = t"Hello {name!r}, value: {value:.2f}"
formatted = f"Hello {name!r}, value: {value:.2f}"

assert f(templated) == formatted  # ✅
```

---

# **Structural pattern matching**

<div v-click><p>Iterate + <code>match</code> is the recommended pattern</p></div>

<div v-click>
```python314
for item in template:
    match item:
        case str() as s:
            ...  # handle static text
        case Interpolation() as interp:
            ...  # handle interpolations
```
</div>

---

# What can I do with **libraries**?

<div v-click><p>Let's look at HTML templating with <code>tdom</code></p></div>

---

# Meet `tdom`

<div v-click><p>An HTML templating library built on t-strings</p></div>
<div v-click><p><code>pip install tdom</code></p></div>
<div v-click><p>If you've used JSX, this will feel familiar</p></div>

---

# `tdom` **basics**

````md magic-move
```python314
from tdom import html
```
```python314
from tdom import html

greeting = html(t"<h1>Hello, World!</h1>")
```
```python314
from tdom import html

greeting = html(t"<h1>Hello, World!</h1>")
type(greeting)  # <class 'Element'>
str(greeting)   # "<h1>Hello, World!</h1>"
```
````

---

# Variable **interpolation**

```python314
name = "Alice"
age = 30
greeting = html(t"""
    <p>Hello, {name}! You are {age} years old.</p>
""")
# <p>Hello, Alice! You are 30 years old.</p>
```

---

# Automatic **XSS protection**

````md magic-move
```python314
evil = "<script>alert('owned')</script>"
```
```python314
evil = "<script>alert('owned')</script>"
page = html(t"<p>Hello, {evil}!</p>")
```
```python314
evil = "<script>alert('owned')</script>"
page = html(t"<p>Hello, {evil}!</p>")
str(page)
# Escaped! No script injection.
```
````

<div v-click><p>Interpolated values are <strong>escaped by default</strong></p></div>

---

# **Attribute** substitution

````md magic-move
```python314
url = "https://example.com"
link = html(t'<a href="{url}">Visit</a>')
# <a href="https://example.com">Visit</a>
```
```python314
my_id = "my-button"
button = html(t"<button id={my_id}>Click</button>")
# <button id="my-button">Click</button>
```
```python314
button = html(
    t"<button disabled={True}>Submit</button>"
)
# <button disabled>Submit</button>
```
````

<div v-click><p>Quoted, unquoted, boolean &mdash; it all works</p></div>

---

# Attribute **spreading**

````md magic-move
```python314
attrs = {
    "href": "https://example.com",
    "target": "_blank",
}
link = html(t"<a {attrs}>External link</a>")
```
```python314
attrs = {
    "href": "https://example.com",
    "target": "_blank",
}
link = html(t"<a {attrs}>External link</a>")
str(link)
# <a href="..." target="_blank">External link</a>
```
````

<div v-click><p>Spread a <code>dict</code> &mdash; like JSX's <code>{'{'}...props{'}'}</code></p></div>

---

# Smart **`class`** handling

<div class="smaller">
````md magic-move
```python314
classes = ["btn", "btn-primary", "active"]
html(t'<button class="{classes}">Click</button>')
# <button class="btn btn-primary active">Click</button>
```
```python314
classes = {"active": True, "hidden": False}
html(t'<button class={classes}>Click</button>')
# <button class="active">Click</button>
```
```python314
overrides = {"btn-primary": True, "btn-secondary": False}
html(t"""
    <button class="btn btn-secondary" class={overrides}>
        Click
    </button>
""")
# <button class="btn btn-primary">Click</button>
```
````
</div>

<div v-click><p>Lists, dicts, and merging &mdash; just like you'd want</p></div>

---

# **Conditional** rendering

```python314
is_logged_in = True
welcome = t"<span>Welcome back!</span>"
login = t"<a href='/login'>Please log in</a>"

header = html(t"""
    <div>{welcome if is_logged_in else login}</div>
""")
```

<div v-click><p>Just Python expressions &mdash; nothing new to learn</p></div>

---

# **Lists** and iteration

```python314
fruits = ["Apple", "Banana", "Cherry"]
fruit_list = html(t"""
    <ul>
        {[t'<li>{fruit}</li>' for fruit in fruits]}
    </ul>
""")
```

<div v-click><p>List comprehensions compose naturally with t-strings</p></div>

---

# Template **composition**

````md magic-move
```python314
header = t"<h1>My Site</h1>"
page = html(t"<div>{header}</div>")
# <div><h1>My Site</h1></div>
```
```python314
header = html(t"<h1>My Site</h1>")
page = html(t"<div>{header}</div>")
# <div><h1>My Site</h1></div>
```
````

<div v-click><p>Nest <code>Template</code> or <code>Element</code> &mdash; both work</p></div>

---

# **Component** functions

<div class="smaller">
````md magic-move
```python314
def Greeting(children, **attrs):
    return html(t"<div {attrs}>{children}</div>")
```
```python314
def Greeting(children, **attrs):
    return html(t"<div {attrs}>{children}</div>")

result = html(t"""
    <{Greeting} id='g1'>Hello!</{Greeting}>
""")
```
```python314
def Greeting(children, **attrs):
    return html(t"<div {attrs}>{children}</div>")

result = html(t"""
    <{Greeting} id='g1'>Hello!</{Greeting}>
""")
str(result)
# '<div id="g1">Hello!</div>'
```
````
</div>

<div v-click><p>Use <code>&lt;{Callable}&gt;</code> syntax to invoke components</p></div>

---

# **Real-world** component

<div class="smaller">
```python314
@dataclass
class Card:
    children: Iterable[Node]
    title: str
    subtitle: str | None = None

    def __call__(self) -> Node:
        return html(t"""
            <div class='card'>
                <h2>{self.title}</h2>
                {self.subtitle and t'<h3>{self.subtitle}</h3>'}
                <div class="content">{self.children}</div>
            </div>
        """)
```
</div>

---

# Using the **Card** component

<div class="smaller">
```python314
result = html(t"""
    <{Card} title='My Card' subtitle='Hello'>
        <p>Card content</p>
    </{Card}>
""")
```
</div>

<div v-click>
```
<div class='card'>
    <h2>My Card</h2>
    <h3>Hello</h3>
    <div class="content"><p>Card content</p></div>
</div>
```
</div>

---

# **Context-sensitive** processing

<div v-click><p><code>html()</code> looks at <strong>where</strong> an interpolation appears</p></div>

<div v-click>

```python314
attrs = {"id": "main"}
val = "shrubbery"
content = "hello"
html(t"<div {attrs} data-x={val}>{content}</div>")
```
</div>

<div v-click class="tight"><p>&ndash; <code>{attrs}</code> in a tag? Spread as attributes</p></div>
<div v-click class="tight"><p>&ndash; <code>{val}</code> in a value position? Quote and escape</p></div>
<div v-click class="tight"><p>&ndash; <code>{content}</code> in the body? Escape for safety</p></div>

---

# How does `html()` **work**?

<div v-click><p>It <strong>parses</strong> the static parts as HTML</p></div>
<div v-click><p>It examines each interpolation's <strong>position</strong> in the grammar</p></div>
<div v-click><p>It decides how to <strong>handle</strong> each value based on context</p></div>
<div v-click><p>It returns a tree of <code>Node</code> objects, not a string</p></div>

---

# Where to **next**?

---

# **Try** t-strings today

<div v-click><p><strong>Python 3.14</strong> is available now</p></div>
<div v-click><p><code>pip install tdom</code> for HTML templating</p></div>
<div v-click><p>Check out <strong>t-strings.help</strong> for docs and examples</p></div>

---

# **Tools** are coming

<div v-click><p>VS Code extension for <strong>syntax highlighting</strong> inside t-strings</p></div>
<div v-click><p>Experimental <strong>ruff</strong> fork for formatting HTML in t-strings</p></div>
<div v-click><p>Type checker support is in progress</p></div>

---

# **Get involved**

<div v-click><p>The ecosystem is <strong>brand new</strong></p></div>
<div v-click><p>Write a processing function &mdash; it's easier than you think</p></div>
<div v-click><p>Build a library &mdash; SQL, CSS, shell scripts, logging...</p></div>
<div v-click><p>The PEP examples repo is a great place to start</p></div>

---

# Thanks!

See **t-strings.help** for more

Find me at **davepeck.org**

Please say hello and get involved!
