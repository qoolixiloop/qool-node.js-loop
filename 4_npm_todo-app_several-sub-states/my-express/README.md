### 4_npm_todo-app_several-sub-states/my-express 
#### Source
https://codeburst.io/node-js-by-example-part-1-668376cd4f96
https://codeburst.io/node-js-by-example-part-2-dad2af5b7012
#### Run project
$ node index.js 
#### Code
Code patterns:  
```js
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
```
