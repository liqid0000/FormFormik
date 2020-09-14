let express = require('express')
let app = express();
let port = process.env.PORT ||8080;
let apiRoutes = require("./routes")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.get('/', (req, res) => res.send('Welcome to Express'));
app.listen(port,     
    console.log("Running FirstRest on Port "+ port)
)
app.use('/api', apiRoutes)
app.use(bodyParser.json());

//connect to mongoose
const dbPath = 'mongodb://localhost/firstrest';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})