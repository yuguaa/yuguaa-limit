# yuguaa-limit
使用（类似p-limit）

```js
import yLimit from "yuguaa-limit";
const foo = (value: any, delay: any) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

const limit = yLimit(2);
const arr = [
  limit(() => foo("1", 1000)),
  limit(() => foo("2", 5000)),
  limit(() => foo("3", 5000)),
  limit(() => foo("4", 5000)),
  limit(() => foo("5", 1000)),
  limit(() => foo("6", 5000)),
];
const getData = async () => {
  const res = await Promise.all(arr);
};
getData();
```

