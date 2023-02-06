import express from "express";
import nunjucks from "nunjucks";

//import { initDB } from "./database/surreal";
//import db from "./database/surreal";

//initDB();

import db from "./database/orient.js";

//var db = server.use('BaseballStats')
console.log('Using Database:'  + db.name);

///////////////////////////////

await db.open();

//////////////////////////////

const app = express();

app.set('view engine', 'html');
app.set('views', './views');

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.get('/', async (req, res) => {
  const done = await db.query("SELECT * FROM todo WHERE isDone = true")
  const todo = await db.query("SELECT * FROM todo WHERE isDone = false")
  res.render('index', {done: done, todos: todo});
});

app.get('/clear', async (req, res) => {
  await db.delete("todo");
  res.redirect("/");
});

app.post('/', async (req, res) => {
  const body = req.body;
  console.log(body)
  if(body['create'] != undefined){
    let text = "";
    if(body['text'] != undefined){
      text = body['text'];
    }
  await db.class.get('todo').then(function(Todo){
      Todo.create({
        text: text,
        isDone: false
      });
   });
  }

  if(body['id'] == undefined){
    res.redirect("/");
    return
  }
  
  if(body['do'] != undefined){
    await db.update(body['id'], {
      isDone: true
    });
  }
  else if(body['undo'] != undefined){
    await db.update(body['id'], {
      isDone: false
    });
  }//Изменение
  else if(body['edit'] != undefined){
    let text = "";
    if(body['text'] != undefined){
      text = body['text'];
    }
    await db.class.get('todo').then(function(Todo){
    Todo.update(body['id'], {
      text: text
    });
  })
  }//Удаление
  else if(body['delete'] != undefined){
    await db.class.get('todo').then(function(Todo){
    Todo.delete(body['id']);
  });
  }

  res.redirect("/");
});

app.listen(3000, () => {
  console.log('Todo app listening on port 3000');
});