let app = require("express")();
let http =  require("http").Server(app);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let messages = [ {
    nickName: "lol",
    userName: "bla",
    text: " fdsfsdf @baks1",
    date: "15 марта 1003 года"

},{
    nickName: "lol",
    userName: "bla",
    text: " fdsfsdf @baks1",
    date: "15 марта 1003 года"

},
{
    nickName: "lol",
    userName: "bla",
    text: " fdsfsdf @baks1",
    date: "15 марта 1003 года"

}
];
let users = [{
    userName: "Kostya",
    nickName: "Baks"
},{
    userName: "Lol",
    nickName: "234324"
},
{
    userName: "Lol",
    nickName: "sds"
}
];

function userValidation(nickName) {
    let valid = true;
    for( let i = 0; i < users.length; i++) {
        if(users[i].nickName.toLowerCase() === nickName.toLowerCase()) {
            return valid = false;
        }
    }

    return valid;
    
}


app.get("/?", function(req, res){
    res.sendfile(__dirname + "/index.html");
});

app.get("/script.js", function (req, res){
    res.sendfile(__dirname + "/script.js");
})

app.get("/style.css", function (req, res){
    res.sendfile(__dirname + "/style.css");
})


app.get("/messages", function (req, res){
    res.json(messages);
})

app.post("/messages", function (req, res){
    messages.push(req.body);
    if(messages.length>100){
        messages.shift(); 
    }
})

app.get("/users", function (req, res){
    res.json(users);
})

app.post("/users", function (req, res){         
        if(userValidation(req.body.nickName)){
            users.push(req.body);
            res.sendStatus(200).send('User add!');           
        } else {

            res.status(404).send('Sorry, User alredy exist!');
        }
      
})
    
   


http.listen(5000, function(){
    console.log( "listening on port 5000")
})

