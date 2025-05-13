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
<div v-click><p><i>Also</i> known as <strong>t-strings</strong></p></div>

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

# T-strings are **not** strings (2)

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
<p>Given a <code>Template</code>, you can write or call <strong>custom code</strong> to:</p>
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
image: /assets/img/f-strings-awesome.png
backgroundSize: contain
---

# F-strings are **awesome**:

&ndash; Powerful

&ndash; Readable

&ndash; Elegant syntax


---
layout: image-right
image: /assets/img/f-strings-dangerous.png
backgroundSize: contain
---

# F-strings get **misused**:

&ndash; Injection vulns



