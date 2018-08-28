## Documentation

Here is a list of layout classes, for general styling.

### body
- `.viewport-freeze` Disable body scroll property
- `.overlay` Show a overlay
- `.align-left`, `.align-center`, `.align-right` Overwrite content alignment
- `.hidden` to hide elements

### Viewport helper

We use an viewport helper to set a bridge between CSS Breakpoints and Javascript. Valid Breakpoint informations are `mobil`, `tablet` and `desktop`. Those informations are availabel on Javascript side while using the `window.breakpoint()` function.

### Scroll helper

We use an scroll helper to give us informations on event scroll. On `body` it will add a class `.scrolled` if any scrolling event happend and page is not at it top coordinates. Also there will be add an `.up` or `.down` indicator to see which direction was scrolled to.