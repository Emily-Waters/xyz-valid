# xyz-valid

A lightweight library for type validation both in the browser and node environments.

`npm install xyz-valid`

**Table of contents:**

- [xyz-valid](#xyz-valid)
  - [Assertions](#assertions)
    - [Array](#array)
    - [Boolean](#boolean)
    - [Enum](#enum)
    - [Literal](#literal)
    - [Number](#number)
      - [Min](#min)
      - [Max](#max)
    - [Object](#object)
      - [Strict](#strict)
      - [Compare](#compare)
    - [Regex](#regex)
    - [String](#string)
      - [Min](#min-1)
      - [Max](#max-1)
      - [Length](#length)
  - [Modifiers](#modifiers)
    - [Optional](#optional)
    - [Nullable](#nullable)
    - [Transform](#transform)
    - [Default](#default)

## Assertions

### Array

```typescript
xyz.array(xyz.string()).parse(["foo", "bar", "baz"]);
```

### Boolean

```typescript
xyz.boolean().parse(true);
```

### Enum

```typescript
xyz.enum(["foo", "bar", "baz"]).parse("foo");
```

### Literal

```typescript
xyz.literal("foo").parse("foo");
```

### Number

```typescript
xyz.number().parse(1);
```

#### Min

```typescript
// Throws an Invalid Min error
xyz.number().min(1).parse(0);
```

#### Max

```typescript
// Throws an Invalid Max error
xyz.number().max(3).parse(4);
```

Note: `.min()` and `.max()` can be combined

```typescript
xyz.number().min(1).max(3).parse(2);
```

### Object

```typescript
xyz
  .object({
    foo: xyz.string(),
    bar: xyz.number(),
    baz: xyz.object({
      subfoo: xyz.string(),
      subbar: xyz.literal("subbar"),
    }),
  })
  .parse({
    foo: "foo",
    bar: 1,
    baz: {
      subfoo: "subfoo",
      subbar: "subbar",
    },
  });
```

#### Strict

```typescript
// Does not throw an error
xyz
  .object({
    foo: xyz.string(),
    bar: xyz.string(),
  })
  .parse({
    foo: "foo",
    bar: "bar",
    baz: "baz",
  });

// Throws an Invalid Strict Object error
xyz
  .object({
    foo: xyz.string(),
    bar: xyz.string(),
  })
  .strict()
  .parse({
    foo: "foo",
    bar: "bar",
    baz: "baz",
  });
```

#### Compare

```typescript
xyz
  .object({
    email: xyz.string(),
    verifyemail: xyz.string(),
  })
  .compare((obj) => obj.email === obj.verifyemail)
  .parse({
    email: "foo@bar.com",
    verifyemail: "foo@bar.com",
  });
```

### Regex

```typescript
xyz.regex(/foo/).parse("foobarbaz");
```

### String

```typescript
xyz.string().parse("foo");
```

#### Min

```typescript
// Throws an Invalid Min error
xyz.string().min(4).parse("foo");
```

#### Max

```typescript
// Throws an Invalid Max error
xyz.string().max(2).parse("foo");
```

#### Length

```typescript
xyz.string().length(3).parse("foo");
```

Note: `.min()` and `.max()` can be combined

```typescript
xyz.string().min(2).max(4).parse("foo");
```

## Modifiers

### Optional

```typescript
xyz.string().optional().parse("foo");
xyz.string().optional().parse(undefined);
```

### Nullable

```typescript
xyz.string().nullable().parse("foo");
xyz.string().nullable().parse(null);
```

### Transform

```typescript
xyz
  .string()
  .transform((str) => parseInt(str))
  .parse("1");
```

### Default

```typescript
// Returns "foo"
xyz.string().optional().default("foo").parse(undefined);

// Returns "bar"
xyz.string().optional().default("foo").parse("bar");
```
