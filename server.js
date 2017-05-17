const express = require('express');
const moment = require('moment');

const REG_TIMESTAMP = /^\d+$/;

const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/*', function (req, res) {
  const param = decodeURIComponent(req.url.substr(1)); // remove leading '/'
  let date = null;
  if (REG_TIMESTAMP.test(param)) {
    date = moment.unix(parseInt(param, 10)).utc();
  } else {
    date = moment.utc(param, 'MMMM D, YYYY');
  }
  const valid = date.isValid();
  const result = {
    unix: valid ? date.unix() : null,
    natural: valid ? date.format('MMMM D, YYYY') : null,
  };
  res.send(JSON.stringify(result));
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('Node app is running on port', app.get('port'));
});
