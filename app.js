import express from "express";
import nunjucks from "nunjucks";

//import { initDB } from "./database/surreal";
//import db from "./database/surreal";

//initDB();

import db from "./database/orient.js";

//var db = server.use('BaseballStats')
console.log('Using Database:'  + db.name);

//////////////////////////////

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
  //const rid = await db.query("SELECT * FROM [#47:0]")
  todo.forEach(element => {
    element.id = `#${element["@rid"].cluster}:${element["@rid"].position}`
  });
  done.forEach(element => {
    element.id = `#${element["@rid"].cluster}:${element["@rid"].position}`
  });
  console.log(todo);
  res.render('index', {done: done, todos: todo});
});

app.get('/clear', async (req, res) => {
  await db.delete("todo");
  res.redirect("/");
});
//Запросы //Создание
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
    db.update(`${body['id']}`)
   .set({
      isDone:true
   }).one()
   .then(
      function(update){
         console.log('Records Updated:', update);
      }
   );
  }
  else if(body['undo'] != undefined){
    db.update(`${body['id']}`)
   .set({
      isDone:false
   }).one()
   .then(
      function(update){
         console.log('Records Updated:', update);
      }
   );
  }//Изменение
  else if(body['edit'] != undefined){
    db.update(`${body['id']}`)
   .set({
      text: body.text
   }).one()
   .then(
      function(update){
         console.log('Records Updated:', update);
      }
   );
  }//Удаление
  else if(body['delete'] != undefined){
    db.delete().from('TODO')
    .where(`@rid = ${body['id']}`).limit(1).scalar()
    .then(
       function(del){
          console.log('Records Deleted: ' + del);
       }
    );
  };

  res.redirect("/");
});

app.listen(3000, () => {
  console.log('Todo app listening on port 3000');
});