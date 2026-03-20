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
