let username = "Asuka" //little string
let cringePoints = 42069 //little numbers
let baseUser = true //little booleans
const ADMIN = "ADMIN"
//44) Best practice for variable names in JS is to double quote the variables, although it's parsable without
//45) This Asuka variable is being assigned to a little object, as opposed to a object instantiated
//49) Would be nice to dynamically render users list. JS can work, but jQuery will ensure it works across
      //a looooot of browsers that execute our code, we might have an Internet Explorer user
      //jQuery lets us avoid having to write code to encapsulate browser and switch cases based on browser
      //and generally save typing by using jQuery to abstract to some degree
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
//51) This global constant variable through jQuery is p. powerful, can do a lot with what it retrieves
        //it's bound to the DOM so it can be changed and will reflect on the screen
//52) '$' in front of DOM-tied variables to show it's a jQuery object...not necessary but good
let $h1 = jQuery("h1") //this returns all 'h1's with that CSS expression parameter syntax, binds to variable
//h1.remove() //all h1's in users.html go kaboom!
$h1.html("User Admin") //all h1's returned from let h1 variable get changed to "User Admin"
    .css("color", "red")
//53) jQuery functions returns the original object
//h1 = jQuery("h1#mainTitle") selects only the h1s with the id equaling "mainTitle"

//54) '$()' is also short for calling the jQuery() function, produced tags need still be put into the DOM
let $animeWatchers = $("<h1>Weeb List</h1>") //jQuery recognizes either HTML or CSS and behaves accordingly
let $body = $("body") //this returns the 'body' html tag so that it can be interacted with
$body.append($animeWatchers)

let $weebUserList = $("#weebUserList")
$weebUserList.append("<li>Goku</li>")

let $howl = $("<li>")
$howl.append("Howl") //no need for $howl = $howl.append()...jQuery functions change the thing
$howl.append("<button>Delete</button>")
$weebUserList.append($howl) // complex appends are possible, is what this string of appends shows

function renderWeebUsers(){ // arrow syntax goes...const renderWeebUsers = () => {
    $weebUserList.empty()
    for (let u in users){
        //$weebUserList.append("<li>" + users[u].username + "</li>")
        //let $newWeeb = $("<li>" + users[u].username + "</li>")
        //embedded stuff can be escaped & expressed w/ ${hi}...React also does break out/embed JS -> HTML stuff
        let $newWeeb = $(`<li>
                            ${users[u].username}
                        </li>
        `)
        $weebUserList.append($newWeeb)
    }
}
renderWeebUsers()


//48) 'var' is the oldest way to declare. Those variables can be globally and locally scoped & re-declared
       //'let' is preferred for variable declaration as it's block scoped, can't access it outside its
       // squiggly lines, can be updated but NOT re-declared, but there can be same let vars in diff scopes
       // 'const' declarations are block scoped like 'let' declarations, but can't be updated nor re-declared