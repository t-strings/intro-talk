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

<div v-click><p>better known as <strong>Template Strings</strong></p></div>
<div v-click><p><i>also</i> known as <strong>t-strings</strong></p></div>

---

# We'll cover:

<div v-click><p><strong>What</strong> are t-strings?</p></div>
<div v-click><p><strong>Why</strong> are t-strings?</p></div>
<div v-click><p><s>advanced usage</s></p></div>

---

# What are **t-strings**?

<div v-click><p>new feature shipping in <strong>Python 3.14</strong></p></div>
<div v-click><p>they <strong>generalize</strong> f-strings</p></div>
<div v-click><p>they help make f-strings <strong>safer</strong></p></div>




---
layout: cover
---

# A generalization of **f-strings**

---

# The same syntax!

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

# Really, the same syntax!

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




