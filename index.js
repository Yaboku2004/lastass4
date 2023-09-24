var express=require("express");
var bodyParse=require("body-parser");
var mongoose=require("mongoose");

const app=express()

app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://yabokugamiyt:Yaboku-gami2004@cluster1.e7c68ur.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
 var db = mongoose.connection

 db.on('error',()=> console.log("error in connecting database"));
 db.once('open',()=> console.log("Connected to database"));

 app.get("/", (req,res)=>{
    return res.redirect("index.html");
 })
 .listen(3000);

 app.post('/login', async (req, res) => {
    try {
      // Get the username and password from the request body
      const username = req.body.username;
      const password = req.body.password;
  
      // Check the username and password against the vendor collection
      const vendor = await db.collection('vendor').findOne({ email: username });
      if (vendor && vendor.password === password) {
        // Login success
        console.log('Login success');
        return res.redirect('/vendor.html');
      }
  
      // Check the username and password against the shipper collection
      const shipper = await db.collection('shipper').findOne({ email: username });
      if (shipper && shipper.password === password) {
        // Login success
        console.log('Login success');
        return res.redirect('/shipper.html');
      }
  
      // Check the username and password against the customer collection
      const customer = await db.collection('customer').findOne({ email: username });
      if (customer && customer.password === password) {
        // Login success
        console.log('Login success');
        return res.redirect('/Customer.html');
      }
  
      // Login failed
      console.log('Login failed');
      return res.redirect('/index.html');



      
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

app.post("/sign_up_vendor", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var businessName = req.body.businessName;
    var businessAddress = req.body.businessAddress;
    var profilePicture = req.body.profilePicture;
    var data = {
        "username": username,
        "email": email,
        "phno": phno,
        "password": password,
        "businessName": businessName,
        "businessAddress": businessAddress,
        "profilePicture": profilePicture
    }
    db.collection('vendor').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_success.html');

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');

})

app.post("/sign_up_shipper", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var shipperName = req.body.shipperName;
    var DistributionHub = req.body.DistributionHub;
    var profilePicture = req.body.profilePicture;
    var data = {
        "username": username,
        "email": email,
        "phno": phno,
        "password": password,
        "shipperName": shipperName,
        "DistributionHub": DistributionHub,
        "profilePicture": profilePicture
    }
    db.collection('shipper').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_success.html');

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');

})

app.post("/sign_up_customer", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var Address = req.body.Address;
    var Name = req.body.Name;
    var profilePicture = req.body.profilePicture;
    var data = {
        "username": username,
        "email": email,
        "phno": phno,
        "password": password,
        "Address": Address,
        "Name": Name,
        "profilePicture": profilePicture
    }
    db.collection('customer').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_success.html');

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');

})