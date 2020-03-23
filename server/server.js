'use strict';

const express = require('express');
const path = require('path');
const fallback = require('express-history-api-fallback');
const app = express();

const root = path.resolve(__dirname, '..', 'packed');
const rootImg = path.resolve(__dirname, '..', 'public');
app.use(express.static(root));
app.use(express.static(rootImg));
app.use(fallback('index.html', { root: root }));
app.use(fallback('index.html', { root: rootImg }));

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
