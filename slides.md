---
theme: default
transition: slide-left
title: A Whirlwind Tour of Template Strings
colorSchema: dark
layout: default
mdc: true
---
<center><h1>A whirlwind tour of <strong>Template&nbsp;Strings</strong></h1></center>

---

# Hi, I'm **Dave Peck**.

I'm an independent software developer based in sunny Seattle, Washington. <span class="little">~~☔️~~</span>

<!--
"independent software developer" is what you say in polite company when you mean "software weirdo who works from home and doesn't have a boss"

I have spent most of my career in the Seattle startup community, and have spent
the last two years working on civic technology projects in tandem with nonprofits
and local government.

But enough about me!
-->

---

# Let's talk **PEP 750**!

<div v-click><p>Better known as <strong>Template Strings</strong></p></div>
<div v-click><p>...<i>also</i> known as <strong>t-strings</strong></p></div>

---

# We'll cover:

<div v-click><p><strong>What</strong> are t-strings?</p></div>
<div v-click><p><strong>Why</strong> are t-strings?</p></div>
<div v-click><p><s>Advanced usage</s></p></div>

---

# What are **t-strings**?

<div v-click><p>New feature shipping in <strong>Python 3.14</strong></p></div>
<div v-click><p>They <strong>generalize</strong> f-strings</p></div>
<div v-click><p>They help make f-strings <strong>safer</strong></p></div>
<div v-click><p>They help make f-strings <strong>more powerful</strong></p></div>


---
layout: cover
---

# Generalizing **f-strings**

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

# But t-strings are **different**:

````md magic-move
```python314
type(f"Hello, {name}!")
```
```python314
type(f"Hello, {name}!")  
# <class 'str'>
```
```python314
type(f"Hello, {name}!")  
# <class 'str'>
type(t"Hello, {name}!")
```
```python314
type(f"Hello, {name}!")  
# <class 'str'>
type(t"Hello, {name}!")
# <class 'string.templatelib.Template'>
```
````

<div v-click><p>(Wait, <strong>what's this</strong>?)</p></div>

---

# T-strings are **not** strings

<div v-click><p>You write them like they <i>are</i>...</p></div>
<div v-click>
```python314
t"This is not a string"
```
</div>
<div v-click><p>But they evaluate to a new type, <code>Template</code></p></div>

---

# T-strings are **not** strings <span class="slide-count">(2)</span>

````md magic-move
```python314
str(t"Please be a string!")
```
```python314
str(t"Please be a string!")
# "Template(
#    strings=('Please be a string!',), 
#    interpolations=(),
# )"
```
````

<div v-click><p>You have to <strong>process</strong> templates to use them</p></div>

---

# Processing templates

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
layout: image
image: /img/bobby-tables-from-xkcd-by-randall-munroe.png
backgroundSize: contain
---

<div class="bottom-out"><center><p>(with apologies to randall munroe)</p></center></div>

---

# Little Bobby Tables

<div class="smaller">
````md magic-move
```python314
def get_query(name: str):
	return f"SELECT * FROM students WHERE name = '{name}'"
```
```python314
def get_query(name: str):
	return f"SELECT * FROM students WHERE name = '{name}'"

query = get_query("Robert'); DROP TABLE Students;--")
execute(query)  # ☠️
```
```python314
def get_query(name: str):
	return f"SELECT * FROM students WHERE name = '{name}'"

@app.route('/user/<str:name>')
def user_data(name: str):
	query = get_query(name)
	return execute(query)  # ☠️
```
````
</div>

---

# Little Bobby, uh, HTML-bles

<div class="smaller">
````md magic-move
```python314
def render_user(name: str):
	return f"<div class='user'>{name}</div>"
```
```python314
def render_user(name: str):
	return f"<div class='user'>{name}</div>"

render_user("<script>alert('Owned!')</script>")  # ☠️
```
```python314
def render_user(name: str):
	return f"<div class='user'>{name}</div>"

@app.route("/user/<str:name>")
def user_html(name: str):
	return render_user(name)  # ☠️
```
````
</div>


---

# T-strings to the **rescue**

<div v-click><p>With <code>Template</code> you can know:</p></div>

<div v-click><p>&ndash; Which parts of the string are <strong>static</strong></p></div>
<div v-click><p>&ndash; Which parts of the string are <strong>dynamic</strong></p></div>

<div v-click><p>You <i>can't</i> do this with f-strings</p></div>

---

# T-strings to the **rescue** <span class="slide-count">(2)</span>

