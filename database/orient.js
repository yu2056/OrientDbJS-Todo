import OrientDB from 'orientjs';

var server = await OrientDB({
    host:     'localhost',
    port:     2424,
    username: 'root',
    password: 'root_passwd',
    useToken: true
 });
 
 var db = await server.use({
    name:     'mahasiswa',
    username: 'root',
    password: 'rootpwd'
 }); 

export default db;