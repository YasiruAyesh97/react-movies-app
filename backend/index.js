const express = require('express');
const mongoose = require('mongoose');
const config =require('config');

const genreRouter =require('./router/genre.js');
const movieRouter =require('./router/movie.js');
const userRouter = require('./router/user.js');
const loginRouter = require('./router/auth.js');
const app = express();
let bodyParser =require('body-parser');
let cors = require('cors');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR :jwtPrivateKey IS not define');
    process.exit(1);

}else{

}
mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('connected to the MongoDb'))
    .catch(error=>console.error('could not connect to mongodb',error))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/genre',genreRouter);



app.use('/movies',movieRouter);
app.use('/user',userRouter);
app.use('/auth',loginRouter);

app.get('/', (req, res) => res.send('Hello world!'));


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));