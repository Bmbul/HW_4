 "use strict"

const http = require("http");//modules we require
const fs = require("fs");
const todos = [];//empty array
http.createServer((req, res)=>{//create server
  if (req.url==="/"){
    fs.readFile("./public/index.html", (err, data)=>{
      res.statusCode = 200;
      res.end(data);
    });
  }
  else if (req.url==="/initialTodos" && req.method==="GET"){// when we get request of the method 'GET' we just response the todo list we have
      res.end(JSON.stringify(todos));// we make string since in server we send and get only JSON strings
  }
  else if (req.url==="/todoAdd" && req.method==="POST"){// when the method of request is 'POST' we get the obj which became JSON string change it to obj
      req.on("data", (obj)=>{//and make it equeal to object which is constant variable
        const object = JSON.parse(obj); //then add to it an id  which is created with Math.random function which creates random number
        object.id = Math.random();// after all we push this to our original todos list
        todos.push(object);
      });
      req.on("end", ()=>{
        res.end(JSON.stringify(todos)); // and again as a result we take stringified JSON of our todos.
      });
  }
  else if (req.url==="/todoCheckedChange" && req.method==="PUT"){ // if the method is 'PUT'
    req.on("data", (obj)=>{
      const id = JSON.parse(obj).itemid*1;
      for (let i=0; i<=todos.length-1; i++){
        if (todos[i].id === id){
          todos[i].checked = !todos[i].checked;
        }
      }
    });
    req.on("end", ()=>{
      res.end(JSON.stringify(todos));
    });
  }
  else if (req.url==="/todoSearch" && req.method==="POST"){
    let searchedTodos = [];
    req.on("data", (obj)=>{
      const searchText = JSON.parse(obj).searchText.toLowerCase();
      if (searchText==="")
        searchedTodos = todos;
      else {
        for (let i=0; i<=todos.length-1; i++){
          if (todos[i].todo.toLowerCase().search(searchText)>=0)
            searchedTodos.push(todos[i]);
        }
      }
    });
    req.on("end", ()=>{
      res.end(JSON.stringify(searchedTodos));
    });
  }
  else if (req.url==="/todoDelete" && req.method==="DELETE"){
      req.on("data", (obj)=>{
        const id = JSON.parse(obj).itemid*1;
        for (let i=0; i<=todos.length-1;i++){
          if (todos[i].id===id)
            todos.splice(i,1);
        }
      });
      req.on("end", ()=>{
        res.end(JSON.stringify(todos));
      });
  }
  else {
    fs.readFile("./public"+req.url, (err, data)=>{
      res.statusCode = 200;
      res.end(data);
    });
  }
}).listen(8080);
