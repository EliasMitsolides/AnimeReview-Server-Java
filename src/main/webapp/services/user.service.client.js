//59)This is specifically dedicated to talking to the server, data interaction goes through here.
//  Good Practice...Objects with such particular roles? Put them in a directory with files of just that role.
//  This service manipulates the model that lives in the "real" server. Maintain =/= manipulate (change thru RESTful)
//  If this function is called with the keyword "new" the call will be treated as a constructor, can pass params
//60) 'this' keyword is a reference to the instance that's created. Can use can variables made in the object.
//  the 'this' keyword is how we'll access the functions/variables created here.
//61) In JavaScript 'this' is not a static pointer but moves around depending on new context
//  If the 'createUser' function is being done, 'this' changes to refer to that stack. 'self' maintains a local 'this'
function AdminUserServiceClient(){
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
    this.url = 'http://localhost:3000/api/users'
    var self = this;
    function createUser(user) {
        return fetch(self.url, {
            method: 'POST',
            body: JSON.stringify(user), //contains body, user refers to JSON object that must be a string inside body
            headers:{
                "content-type": "application/json"
            } //inform that the body is formatted in the international JSON format, no typical string, to parse well
        }).then(response => response.json())
    }
    function findAllUsers() {
        //62) Asynchronous communication - fetch returns immediately, doesn't wait n block JS's lone thread
        //  This is good, blocking JavaScript's one thread would not be stellar! But we need to know when a response
        //  comes, register for a "Callback". fetch returns a 'promise', an object that listens for future responses
        //let promise = fetch(self.url); //could do fetch(self.url).then(function(...
        //.then lets us register for that callback, we need a function to handle that response from server
        //let body = promise.then(function(response){
        //    console.log(response)
        //    return response.json() // returns another promise, the .json(), set that return as 'body'
        //})
        //body.then(users => console.log(users))
      return fetch(self.url).then(function(response) {  //  return fetch(self.url)
          return response.json()                        //    .then(response => response.json())
      })                                                // /\/\implied return/\/\ in ES6,
    }
    function findUserById(userId) {}
    function updateUser(userId, user) {}
    //63) Backtick `` allows cleaner string interpolation, use ${} in JS to concatenate without +'s and hella ""s
    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`, {
            method: 'DELETE'
        })
    }
}