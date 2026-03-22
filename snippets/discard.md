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
