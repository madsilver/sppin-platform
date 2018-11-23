const express = require('express');
const app = express();
app.use(express.static(__dirname + "/dist/"));
app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));
app.listen(8000, () => console.log(`server running at port 8000`));