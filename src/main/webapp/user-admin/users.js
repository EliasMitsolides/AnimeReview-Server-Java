let username = "Asuka"
let cringePoints = 42069
let baseUser = true
const ADMIN = "ADMIN"
//44) Best practice for variable names in JS is to double quote the variables, although it's parsable without
//45) This Asuka variable is being assigned to a little object, as opposed to a object instantiated
let Asuka = {
    username: username,
    "cringePoints": cringePoints,
    baseUser: baseUser,
    role: ADMIN
}
//46) We got arrays in JS too! Iterations too, for loops and all
let users = [
    Asuka, {username: "Doflamingo"}, {username: "Elric"}
]
users.push(
    {username: "Faust"}
)
for(let u=0; u<users.length; u++){
    // console.log(users[u]) // for printing the variables in users
    console.log(u)
}
//47) In Java/higher level languages, 'u' would be an instance of users, in JS 'u' is just an index
for (let u in users){
    console.log(u) // nothing special here, this is shorter syntax for the above loop
}
//48) 'var' is the oldest way to declare. Those variables can be globally and locally scoped & redeclared
       //'let' is preferred for variable declaration as it's block scoped, can't access it outside its
       // squiggly lines, can be updated but NOT redeclared, but there can be same let vars in diff scopes
       // 'const' declarations are block scoped like 'let' declarations, but can't be updated nor redeclared