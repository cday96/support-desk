## `Express asyncHandler`

### Installation:

`npm install --save express-async-handler`

or

`yarn add express-async-handler`

### Usage:

```
const asyncHandler = require('express-async-handler')

express.get('/', asyncHandler(async (req, res, next) => {
    const bar = await foo.findAll();
    res.send(bar)
}))
```

### Import in TypeScript:

`import * as asyncHandler from 'express-async-handler'`
