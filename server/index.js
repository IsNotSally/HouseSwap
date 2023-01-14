const express = require('express')
const app = express();
const cors = require('cors');

const router = require('./router.js');

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const PORT = 3001;
app.use(cors(corsConfig));
app.use(express.json());
app.use(router);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // eslint-disable-line no-console
});
