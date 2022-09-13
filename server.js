const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path=require('path');

const databaseConnect = require('./backend/config/database')
const authRouter = require('./backend/routes/authRoute')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const messengerRoute = require('./backend/routes/messengerRoute');

dotenv.config({
     path : 'backend/config/config.env'
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger',authRouter);
app.use('/api/messenger',messengerRoute);

app.use(express.static (path.join(__dirname, "/frontend")));

app.get('', (req, res) => { res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});


const PORT = process.env.PORT || 5000
app.get('/', (req, res)=>{
     res.send('This is from backend Sever')
})

databaseConnect();

app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
})