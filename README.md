# Drag & Drop Debugger

Implementing drag and drop behaviors, for example using the
[HTML Drag and Drop API](href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API),
can enable truly magical experiences for users. Debugging such logic can be
challenging though because it's hard to see what exact data is being attached to
dragged items. This tool helps you inspect and craft drag payloads to make this
easier.

## Running the app

```
pnpm dev
```

## Related work

- https://evercoder.github.io/clipboard-inspector/ — _I found this when searching for tools to inspect clipboard contents after I had already built the app. It turns out this already does much of what I had in mind, including the ability to inspect drag payloads._
