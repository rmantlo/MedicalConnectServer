require('./node_modules/dotenv/lib/main').config();
let express = require('express');
let app = express();
let user = require('./controllers/usercontroller');
let validatedUser = require('./controllers/uservalicontroller');
let forum = require('./controllers/forumcontroller');
let comment = require('./controllers/commentcontroller');
let db = require('./db');
let bodyParser = require('body-parser');

db.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/userinfo', validatedUser);
app.use('/forum', forum);
app.use('/comments', comment)

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
})

//below is in .env file for deploying
//DATABASE_URL = postgresql://<user>:<password>@<host>/<dbname>