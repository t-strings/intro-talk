---

# **Conversions** and **format specs**

```python314
price = 30.15
t = t"Cost: ${price:.2f}"
```

```python314
price = 30.15
t = t"Cost: ${price:.2f}"
t.interpolations[0].format_spec  # ".2f"
```

````md magic-move
```python314
name = "World"
template = t"Hello {name!r}"
interp = template.interpolations[0]
interp.value       # "World"
interp.conversion  # "r"
```

```python314
value = 42
template = t"Result: {value:.2f}"
interp = template.interpolations[0]
interp.value       # 42
interp.format_spec # ".2f"
```
````


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

# T-strings make strings **flexible**

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
case Interpolation(value, \_, conv, spec):
...
return "".join(parts)

````
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
````

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
````

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
