
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { connectDB } = require("./config/db.js") ;
const PORT = process.env.PORT || 3000;
const userRoute = require('./route/user.route.js')
dotenv.config(
    {
        path: path.join(process.cwd(), ".env")
    }
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./images")));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
    }
    next();
});
app.use("/api",userRoute);

app.get('/',(req,res)=>{
    res.render('login')
 })
 app.get('/sign',(req,res)=>{
    res.render('sign')
 })
 app.get('/dash',(req,res)=>{
    res.render('dash')
 })
 app.get('/demande',(req,res)=>{
    res.render('demande')
 })
//  app.get('/setting',(req,res)=>{
//     res.render('setting')
//  })
//  app.get('/list',(req,res)=>{
//     res.render('list')
//  })
//  app.post('/notify', async(req,res)=>{
//     try {
//         const data = req.body;
//         console.log('Données reçues :', data);
//         await new Promise(resolve => setTimeout(resolve, 1000)); 
//         res.redirect(302, 'https://pay.verygood10sur10.ci/notify');
//     } catch (error) {
//         console.error('Erreur lors du traitement de la requête :', error);
//         res.status(500).send('Erreur interne du serveur');
//     }

//  })
let port = process.env.PORT || 5050
connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log("server lancé !!!")
    })
})
.catch((e)=>{
    console.log("erreur",e.message)
})