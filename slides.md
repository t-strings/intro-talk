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
transition: fade
---

# A few **obvious** touchstones



---
layout: image-right
image: /img/magnus.jpg
backgroundSize: contain
transition: fade
---

# Magnus Carlsen


---
layout: image-right
image: /img/wayne.jpg
backgroundSize: contain
transition: fade
---

# Wayne Shorter


---
layout: image
image: /img/cookies.png
backgroundSize: contain
---



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
```python314
name = "world"
template = t"Hi {name}!"
list(template)
# ["Hi ", Interpolation("world"), "!"]
template.strings[0]
# "Hi "
```
```python314
name = "world"
template = t"Hi {name}!"
list(template)
# ["Hi ", Interpolation("world"), "!"]
template.strings[0]
# "Hi "
template.interpolations[0].value
# "world"
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
layout: image-right
image: /img/riddler.png
backgroundSize: contain
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

# Templates make strings **safer**

<div v-click><p>&ndash; Retain the <strong>structure</strong> of the string</p></div>
<div v-click><p>&ndash; Libraries can smartly <strong>escape</strong> values, etc.</p></div>

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

# Let's talk about HTML

<div class="smaller">
````md magic-move
```python314
from some_library import html
```
```python314
from some_library import html

user = get_user_from_db(...)
result = html(t"<div>{user.name}</div>")
# "<div>John</div>"
```
```python314
from some_library import html

user = get_user_from_db(...)
result = html(t"<div>{user.name}</div>")
# <class 'Element'>
```
```python314
from some_library import html

user = get_user_from_db(...)
element = html(t"<div>{user.name}</div>")
# <class 'Element'>
element.tag
# "div"
```
```python314
from some_library import html

user = get_user_from_db(...)
element = html(t"<div>{user.name}</div>")
# <class 'Element'>
element.tag
# "div"
str(element)
# "<div>John</div>"
```
```python314
from some_library import html

user = get_user_from_db(...)
element = html(t"<div id={user.id}>{user.name}</div>")
str(element)
# "<div id='user-123'>John</div>"
```
```python314
from some_library import html

user = get_user_from_db(...)
element = html(t"<div id='{user.id}'>{user.name}</div>")
str(element)
# "<div id='user-123'>John</div>"
```
```python314
from some_library import html

user = get_user_from_db(...)
attribs = {"id": user.id, "class": ["user", "active"]}
element = html(t"<div {attribs}>{name}</div>")
str(element)
# "<div id='user-123' class='user active'>John</div>"
```
````
</div>


---

# **Fancy** template processing

<div v-click><p><code>html()</code> has to do a lot:</p></div>

<div v-click class="tight"><p>&ndash; <strong>Parse</strong> the <code>Template</code></p></div>
<div v-click class="tight"><p>&ndash; Examine each substitution's <strong>type</strong> and <strong>position</strong> in the underlying <strong>grammar</strong></p></div>
<div v-click class="tight"><p>&ndash; Decide how to <strong>render</strong> each value</p></div>


---

# When to use **f-** vs. <strong>t-</strong>strings?

<div v-click><p>&ndash; You <i>probably</i> want f-strings</p></div>
<div v-click><p>&ndash; Use t-strings when you need <strong>escaping</strong></p></div>
<div v-click><p>&ndash; Use t-strings when you have a <strong>grammar</strong></p></div>
<div v-click><p>&ndash; Use t-strings when your <strong>library</strong> does</p></div>

---
transition: wtf-enter
---

# But first: time for a **side quest**


---
layout: image
image: /img/f-strings-wtf.png
---



---

# fstrings.wtf

````md magic-move
```python314
f"{... = }"
```
```python314
f"{... = }"
# '... = Ellipsis'
```
```python314
f"{... = }"
# '... = Ellipsis'
f"{1<5:1<5}"
# '11111'
a = "🍌"
print(f"{a=!a}")
# a='\U0001f34c'
```
````

---
transition: fade
---

# F-string parts of **speech**

Conversions &mdash; `!a`, `!r`, and `!s`

<div v-click><p><code>ascii()</code>, <code>repr()</code>, <code>str()</code></p></div>

---

# F-string parts of **speech**

Conversions &mdash; `!a`, `!r`, and `!s`

````md magic-move
```python314
t"{42!r}"
```
```python314
t"{42!r}".interpolations[0].conversion
# "r"
```
````



---

# F-string parts of **speech**

Format specs &mdash; the stuff after `:`

````md magic-move
```python314
pi = 3.14159
print(f"Pi is approximately {pi:.2f}")
```
```python314
pi = 3.14159
print(f"Pi is approximately {pi:.2f}")
# 'Pi is approximately 3.14'
```
```python314
pi = 3.14159
print(f"Pi is approximately {pi:.2f}")
# 'Pi is approximately 3.14'
print(format(pi, ".2f"))
# '3.14'
```
```python314
pi = 3.14159
print(f"Pi is approximately {pi:.2f}")
# 'Pi is approximately 3.14'
print(pi.__format__(".2f"))
# '3.14'
```
```python314
pi = 3.14159
print(f"Pi is approximately {pi:.2f}")
# 'Pi is approximately 3.14'
print(float.__format__(pi, ".2f"))
# '3.14'
```
```python314
f"{None:burrito}"
```
```python314
f"{None:burrito}"
# TypeError: unsupported format string 
# passed to NoneType.__format__
```
````

---

# Format specs in **t-strings**

````md magic-move
```python314
f"{None:burrito}"
```
```python314
t"{None:burrito}"
```
```python314
t"{None:burrito}"  # 👍
```
```python314
t"{None:burrito}".interpolations[0].value
# None
```
```python314
t"{None:burrito}".interpolations[0].format_spec
# 'burrito'
```
````

---
transition: wtf-exit
---

# Format specs in **t-strings**

Code that **processes** t-strings gets to decide what things mean!

<div v-click><p>&ndash; <i>Can</i> call <code>format()</code></p></div>
<div v-click><p>&ndash; <i>Can</i> go crazy</p></div>


---

# **Grammars** and **libraries**


---
layout: image-right
image: /img/magnus.jpg
backgroundSize: contain
transition: fade
---

<div v-click><p>Chess notation</p></div>


---
layout: image-right
image: /img/chess-position.png
backgroundSize: contain
---

<div class="smallest">
````md magic-move
```python314
knight = board.piece_at("d5")
target = board.square("f6")
```
```python314
knight = board.piece_at("d5")
target = board.square("f6")
# "Nxf6+"
```
```python314
knight = board.piece_at("d5")
target = board.square("f6")
move = t"{knight}x{target}+"
```
```python314
knight = board.piece_at("d5")
target = board.square("f6")
move = t"{knight}x{target}+"
new_board = board.apply(move)
```
````
</div>


---
layout: image-right
image: /img/wayne.jpg
backgroundSize: contain
---

<div v-click><p>Music notation</p></div>


---
layout: image-right
image: /img/speak-no-evil.png
backgroundSize: contain
---

<div class="smallest">
````md magic-move
```python314
tonic = Chord("Cmi11")
sub = Chord("D♭MA7")
```
```python314
tonic = Chord("Cmi11")
sub = Chord("D♭MA7")
A = t"{tonic}|{sub}|{tonic}|{sub}"
```
```python314
tonic = Chord("Cmi11")
sub = Chord("D♭MA7")
A = t"{tonic}|{sub}|{tonic}|{sub}"
transpose(A, 2)
# Dmi11|E♭MA7|Dmi11|E♭MA7
```
```python314
tonic = Chord("Cmi11")
sub = Chord("D♭MA7")
A = t"{tonic}|{sub}|{tonic}|{sub}"
transpose(A, 2)
# Dmi11|E♭MA7|Dmi11|E♭MA7
```
```python314
tonic = Chord("Cmi11")
sub = Chord("D♭MA7")
A = t"{tonic}|{sub}|{tonic}|{sub}"
analyze(A, key="Cmi")
# "i11|♭IIMA7|i11|♭IIMA7"
```
```python314
tonic = Chord("Cmi11")
sub = Chord("D♭MA7")
A = t"{tonic:drop2}|{sub:upper}"
voice(A)
# [C3 B♭3 E♭4 G4]|[D♭3 F4 A♭4 C5]
```
````
</div>

---
layout: image
image: /img/knitting.jpg
---


---

# T-string **libraries**


--- 

# T-strings and HTML

<div class="smaller">
````md magic-move
```python314
from some_library import html

user = get_user_from_db(...)
element = html(t"<div>{user.name}</div>")
# <class 'Element'>
```
```python314
from tdom import html

user = get_user_from_db(...)
element = html(t"<div>{user.name}</div>")
# <class 'Element'>
```
````
</div>


---

# Meet `tdom`

<div v-click><p>An HTML templating library built on t-strings</p></div>
<div v-click><p><code>pip install tdom</code></p></div>
<div v-click><p>If you've used JSX, this will feel familiar</p></div>


---
layout: image
image: /img/cookies2.png
transition: fade
---


---
layout: image
image: /img/ebudde.png
transition: fade
---


---
layout: image
image: /img/reports.png
transition: fade
---


---
layout: image
image: /img/trails.png
transition: fade
---


---
layout: image
image: /img/trails-calc.png
backgroundSize: contain
transition: fade
---



---
layout: image
image: /img/trails-worksheet.png
backgroundSize: contain
transition: fade
---



---
layout: image
image: /img/trails-report.png
backgroundSize: contain
transition: fade
---



---
layout: image
image: /img/trails-reconcile.png
backgroundSize: contain
---



---

# CookieTrails

<div v-click><p>&ndash; A Django application</p></div>
<div v-click><p>&ndash; Uses <code>tdom</code> for templating</p></div>


---
transition: fade
---

# No Django **templates**?

Nope, just Python!


---

# No Django **templates**?

````md magic-move
```text
{% load some_tags %}
```
```python314
import some_tags
```
````

---

# No Django **templates**?

````md magic-move
```text
<div>
    {% include 'other.html' with foo=bar %}
</div>
```
```python314
def other(foo: str) -> Template:
    ...

html(t"<div>{other(foo=bar)}</div>")
```
````


---

# **Component** functions

<div class="smaller">
````md magic-move
```python314
def Greeting(children, **attrs):
    return t"<div class='vivid' {attrs}>{children}</div>"
```
```python314
def Greeting(children, **attrs):
    return t"<div class='vivid' {attrs}>{children}</div>"

result = html(t"<{Greeting} id='g1'>Hello!</{Greeting}>")
```
```python314
def Greeting(children, **attrs):
    return t"<div class='vivid' {attrs}>{children}</div>"

result = html(t"<{Greeting} id='g1'>Hello!</{Greeting}>")
str(result)
# '<div class="vivid" id="g1">Hello!</div>'
```
````
</div>

<div v-click><p>Use <code>&lt;{Callable}&gt;</code> syntax to invoke</p></div>

---

# **Dataclass** component

<div class="smaller">
````md magic-move
```python314
@dataclass
class Card:
    children: Iterable[Node]
    title: str
    subtitle: str | None = None
    ...
```
```python314
@dataclass
class Card:
    ...  # as before
    def __call__(self) -> Template:
        return t"""
            <div class='card'>
                <h2>{self.title}</h2>
                {self.subtitle and t'<h3>{self.subtitle}</h3>'}
                <div class="content">{self.children}</div>
            </div>
        """
```
````
</div>

---

# Using **Card**

<div class="smaller">
```python314
result = html(t"""
    <{Card} title='My Card' subtitle='Hello'>
        <p>Card content</p>
    </{Card}>
""")
```
</div>

<div v-click class="smaller">
```
<div class='card'>
    <h2>My Card</h2>
    <h3>Hello</h3>
    <div class="content"><p>Card content</p></div>
</div>
```
</div>

---
layout: image-right
image: /img/engine-bay.jpg
backgroundSize: contain
---


<div v-click><p>&ndash; <code>tdom</code> 'compiles' templates</p></div>
<div v-click><p>&ndash; <code>tdom</code> caches results</p></div>
<div v-click><p>&ndash; It's fast</p></div>

---

# **Tools** are coming

<div v-click><p>&ndash; For <strong>formatting</strong></p></div>
<div v-click><p>&ndash; For <strong>syntax highlighting</strong></p></div>
<div v-click><p>&ndash; For <strong>type checking</strong></p></div>


---
layout: image
image: /img/droplet.png
backgroundSize: contain
transition: fade
---


---
layout: image
image: /img/bucket.png
backgroundSize: contain
transition: fade
---


---
layout: image
image: /img/ocean.png
backgroundSize: contain
transition: fade
---



---
layout: image
image: /img/droplet.png
backgroundSize: contain
transition: fade
---


---

# Thanks!

See **t-strings.help** for more

Find me at **davepeck.org**

Please say hello!




