var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var mongoose = require('mongoose');
var mongoOp     =   require("./model/mongo");
var router      =   express.Router();

mongoose.connect('localhost:27017/merchants');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/merchants")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req, res) {
    console.log("Body ", req.body);
          var merchantUsername = req.body.username;
          var merchantEmail = req.body.email;
          var merchantPassword =  req.body.password;
          var phone = req.body.phone;
          var web_url = req.body.web_url;
          var merchant_id = req.body.merchant_id;
          var country = req.body.country;
          var state = req.body.state;
          var postcode = req.body.postcode;
          var suburb = req.body.suburb;
          var address1 = req.body.address1;
          var status = req.body.status;
          var logo = req.body.logo;

          var address = {
            country: req.body.address.country,
            state: req.body.address.state,
            postcode: req.body.address.postcode,
            suburb: req.body.address.suburb,
            address1: req.body.address.address1
          }

          mongoose.model('Merchant').create({
              merchantUsername : merchantUsername,
              merchantEmail : merchantEmail,
              merchantPassword : merchantPassword,
              phone: phone,
              web_url: web_url,
              merchant_id: merchant_id,
              address: address,
              status: status,
              logo: logo

              }, function (err, merchant) {
                    if (err) {
                        res.send("There was a problem adding the information to the database.");
                    }
                    console.log('POST creating new merchant: ' + merchant);

                              res.json(merchant);
                              console.log("merchant created");

            });
          })
router.route("/merchants/active")
    .get(function(req, res) {
              console.log("Merchant ID: ", req.params.id);
            mongoose.model('Merchant').findOne({ "status" : "active" }, function (err, merchant) {
                      if(err){
                        console.log(err);
                      } else {
                        res.json(merchant);
                    };
                  });
                  })

router.route('/merchants/:id')
    .get(function(req, res) {
              console.log("Merchant ID: ", req.params.id);
            mongoose.model('Merchant').findById(req.params.id, function (err, merchant) {
                      if(err){
                        console.log(err);
                      } else {
                        res.json(merchant);
                    };
                  });
                  })

router.route('/merchants/:id/edit')
    .put(function(req, res) {
        var merchantUsername = req.body.username;
        var merchantEmail = req.body.email;
        var merchantPassword =  req.body.password;

        mongoose.model('Merchant').findById(req.params.id, function (err, merchant) {
        merchant.update({
          merchantUsername : merchantUsername,
          merchantEmail : merchantEmail,
          merchantPassword : merchantPassword,
        }, function (err, merchant) {
          if (err) {
            res.send("There was a problem adding the information to the database.");
          }
          console.log('PUT updating merchant: ' + merchant);

            res.json(merchant);
            console.log("merchant updated");

          });
        });
      })

    .delete(function(req, res) {
      mongoose.model('Merchant').findById(req.params.id, function (err, merchant) {
        if (err) {
            return console.error(err);
        } else {
          merchant.remove(function (err, game) {
                if (err) {
                    return console.error(err);
                } else {
                     console.log('DELETE removing ID: ' + merchant._id);
                    res.json({message : 'deleted',
                        item : merchant
                        });

                }
          });
        }
    });
  })
app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
