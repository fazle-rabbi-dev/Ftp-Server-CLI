const express = require("express");
const fs = require('fs');
const app = express();
const PORT = 5000;
const os = require('os')
let wlan = os.networkInterfaces();
let wlanURL;
if(wlan.wlan0){
   wlanURL = wlan.wlan0[0].address;
   // console.log('found');
}
// const files = require('./core/model');
const upload = require('./core/uploader');
const rootDir = __dirname;
// require('./core/db');
const {
   red,
   green,
   yellow,
   custom1
} = require('./banner')


// Middleware:
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs')
app.use(express.static('Uploads'));

// All Get Routes:
app.get('/', (req,res) => {
   res.sendFile(rootDir+'/views/html/index.html');
});

app.get('/uploadfiles', (req,res) => {
   res.sendFile(rootDir+'/views/html/upload.html')
});

app.get('/viewfiles', async (req,res) => {
   try {
      const data = fs.readdirSync(rootDir+'/Uploads');
      // console.log(data);
      // const data = []
      res.render('view.ejs',{
         data
      });
   } catch (e) {
      console.log(e);
      res.sendFile(rootDir+'/views/html/error.html');
   }
});

app.get('/adminfr43', (req,res) => {
   res.sendFile(rootDir+'/views/html/admin.html');
});

app.post('/adminfr43/delete', async (req,res)=>{
   // console.log(req.body.id);
   try {
      const _id = req.body.id;
      fs.rmSync(rootDir+'/Uploads/'+_id);
      console.log(`${red}[*] File Deleted Successful`);
      res.status(200).sendFile(rootDir+'/views/html/deletesuccess.html')
   } catch (e) {
      console.log(e);
      res.status(200).sendFile(rootDir+'/views/html/error.html')
   }
});

app.get('*', (req,res) => {
   res.sendFile(rootDir+'/views/html/404.html');
});

// Post Route:
app.post('/uploadfiles', upload.single('file'), async (req,res) => {
   let filename = req.file.filename;
   let {name,creator,filetype} = req.body;
   try {
      // const newData = new files({
      //    name,
      //    creator,
      //    filetype,
      //    file:filename
      // });
      // await newData.save();
      // console.log(newData);
      console.log(green('[*] File Uploaded Successful'));
      // console.log(name);
      // console.log(filename);
      res.sendFile(rootDir+'/views/html/success.html');
   } catch (e) {
      console.log(e);
      console.log(e);
      res.sendFile(rootDir+'/views/html/error.html');
   }
});


// default error handler
app.use((err, req, res, next) => {
res.send('Error')
console.log(err);
//  if (err) {
//     if (err instanceof multer.MulterError) {
//       res.status(500).send("There was an upload error!");
//     } else {
//       res.status(500).send(err.message);
//     }
//  } else {
//     res.send("success");
//  }
});


app.listen(PORT, (err)=>{
   if(!err){
      console.log(
         `
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
║                                ║
║                                ║
║  [*] ${green('Server started at:')}        ║
║  [*] ${custom1(`http://localhost:${PORT}`)}     ║
║  [*] ${custom1(`http://${wlanURL?wlanURL:'null'}:${PORT}`)}          ║
║                                ║
║                                ║
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         `
      );
   }
});