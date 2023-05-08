//58) Want all these global variables to be private avoid name collision w/ other files. Put it in a function! IIFE
//      Want all declared variables is not accessible from out here. JS has '()' be an operator.
//      The IIFE, parenthesis, function () {}() makes a self-contained module that doesn't compete w/ rest of namespace
(function () {
    let userService = new AdminUserServiceClient()
    let username = "Asuka" //little string
    let cringePoints = 42069 //little numbers
    let baseUser = true //little booleans
    let $usernameFld
    let $createWeebBtn
    let $updateWeebBtn
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
    let weebUsers = [
        Asuka, {username: "Doflamingo"}, {username: "Elric"}
    ]
    weebUsers.push(
        {username: "Faust"}
    )

    //47) In Java/higher level languages, 'u' would be an instance of weebUsers, in JS 'u' is just an index
    //for (let u in weebUsers){
    //    console.log(u) // nothing special here, this is shorter syntax for the above loop
    //}
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

    const deleteWeebUser = (index) => {
        let user = weebUsers[index]
        let id = user.id

        userService.deleteUser(id)
            .then(response => {
                //splice local array
                weebUsers.splice(index, 1)
                renderWeebUsers()
            })

    }

    let currentUserIndex = -1
    //This function fills username input field with name of weeb whose "Edit Weeb" was pressed
    const editWeebUser = index => { //parenthesis optional w/ 1 parameter
        const user = weebUsers[index];
        const id = user.id;
        console.log(id);
        currentUserIndex = index;

        userService.findUserById(id)
            .then(user => {
                console.log(user)
                $usernameFld.val(user.username)
            })
    }

    function renderWeebUsers(){ // arrow syntax goes...const renderWeebUsers = () => {
        $weebUserList.empty()
        for (let u in weebUsers){
            //$weebUserList.append("<li>" + users[u].username + "</li>")
            //let $newWeeb = $("<li>" + users[u].username + "</li>")
            //embedded stuff can be escaped & expressed w/ ${hi}...React also does break out/embed JS -> HTML stuff
            let $newWeeb = $(`<li>
                                ${weebUsers[u].username}
                            </li>
            `)
            //57) "Closure" in this case is a delete button being able to remember which weeb it's assigned to
                    //in JS, functions invoked inside loops/bigger functions, inner function remembering stuff from when
                    //it was first declared
                    //so this delete function remembers the context when it was declared, like the specific 'u' index
                    //in other languages, u would be undefined as it would be clicked when the for loop ended
                    //in this create we only gave it a reference to the function
            let $deleteBtn = $("<button>Delete Weeb</button>")
            //when body of arrow function is 1 line, the curly brackets are optional
            //the below deleteWeebUser(u) doesn't occur right way is because the => is a prefix, wont enact left->right
            //let f = () => deleteWeebUser(u)
            $deleteBtn.click( () => deleteWeebUser(u) )
            $newWeeb.append($deleteBtn)

            let $editBtn = $("<button>Edit Weeb</button>")
            $editBtn.click( () => editWeebUser(u) )
            $newWeeb.append($editBtn)

            $weebUserList.append($newWeeb)
        }
    }
    renderWeebUsers()

    $createWeebBtn = $("#createWeebUserBtn")
    $updateWeebBtn = $("#updateWeebUserBtn")
    ////click() can simulate a regular click or with an argument act as a callback
    ////we can do this chunk or declare a function if we want to reuse the functionality
    //$createWeebBtn.click(function () { // () => {
    //    const newWeeb = { username: "New Weeb" }
    //    weebUsers.push(newWeeb)
    //    renderWeebUsers()
    //})
    const createWeebUser = () => {
        const username = $usernameFld.val() //saves val at that moment, is not a pointer so we can reset placeholder now
        $usernameFld.val("") //val with parameters behaves as a write operation, javascript way of setters and getters
        const newWeeb = {
            username: username,
            "cringePoints": 0,
            baseUser: baseUser,
            role: USER
        }
        userService.createUser(newWeeb)
            .then(successfulNewWeeb => {
                weebUsers.push(successfulNewWeeb)
                renderWeebUsers()
            })
    }

    const updateWeebUser = () => {
        let weeb = weebUsers[currentUserIndex]

        weeb.username = $usernameFld.val()
        $usernameFld.val("")
        userService.updateUser(weeb.id, weeb)
            .then(editedWeeb => {
                findAllUsers() //ideally, splice out old user and splice in new user, refresh for laziness
            })
    }

    //55) Do not put parenthesis on createWeebUser as that would invoke it rn, we will instead reference it
    //      for later reference...fun fact in Angular you do need parenthesis for function callbacks
    $createWeebBtn.click(createWeebUser)
    $updateWeebBtn.click(updateWeebUser)

    $usernameFld = $("#usernameFld")
    $usernameFld.attr("placeholder","username")

    const findAllUsers = () => {
        userService.findAllUsers()
            .then(usersFromServer => {
                weebUsers = usersFromServer
                renderWeebUsers()
            })
    }
    findAllUsers()
    //48) 'var' is the oldest way to declare. Those variables can be globally and locally scoped & re-declared
           //'let' is preferred for variable declaration as it's block scoped, can't access it outside its
           // squiggly lines, can be updated but NOT re-declared, but there can be same let vars in diff scopes
           // 'const' declarations are block scoped like 'let' declarations, but can't be updated nor re-declared
})() // the '()' operator in JS checks the left, see's its a function, will invoke it without needing a name