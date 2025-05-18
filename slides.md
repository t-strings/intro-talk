---
theme: default
transition: slide-left
title: A Whirlwind Tour of Template Strings
colorSchema: dark
layout: default
mdc: true
---

<h1 class="centered">A whirlwind tour of <strong>Template&nbsp;Strings</strong></h1>

---

# Hi, I'm **Dave Peck**.

I'm an independent software developer based in sunny Seattle, Washington. <span class="little">~~☔️~~</span>

---

# Let's talk **PEP 750**!

<div v-click><p>Better known as <strong>Template Strings</strong></p></div>
<div v-click><p>...maybe <i>best</i> known as <strong>t-strings</strong></p></div>

---

# We'll cover:

<div v-click><p><strong>What</strong> are t-strings?</p></div>
<div v-click><p><strong>Why</strong> are t-strings?</p></div>
<div v-click><p><strong>How</strong> do I use t-strings?</p></div>
<div v-click><p><strong>Where</strong> to next?</p></div>

---

# What are **t-strings**?

<div v-click><p>New feature shipping in <strong>Python 3.14</strong></p></div>
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

# Template strings have **superpowers**

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

get_student("Robert'); DROP TABLE students;--") # ☠️ ☠️ ☠️
```
```python314
from db import execute_t

def get_student(name: str):
	return execute_t(
		t"SELECT * FROM students WHERE name = '{name}'"
	)

get_student("Robert'); DROP TABLE students;--") # 🎉 🦄 👍
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
# <class 'HTMLElement'>
```
```python314
from some_library import html

user = get_user_from_db(...)
element = html(t"<div>{user.name}</div>")
# <class 'HTMLElement'>
```
```python314
from some_library import html

user = get_user_from_db(...)
element = html(t"<div>{user.name}</div>")
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

# Where to **next**?

<div v-click><p>Libraries!</p></div>
<div v-click><p>Linters, formatters, type checkers!</p></div>
<div v-click><p>Example code!</p></div>

---

# Thanks!

See **t-strings.help** for more

Find me at **davepeck.org**

Please say hello and get involved!