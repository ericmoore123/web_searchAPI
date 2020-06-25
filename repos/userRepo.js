const fs = require('fs');
// File System (fs) module allows for: 
    // Read files
    // Create files
    // Update files
    // Delete files
    // Rename files

const FILE_NAME = "./assets/users.json";

//User Repo is an object of methods that are callable from index.js
let userRepo = {
    // Basic get method for retrieving all data from JSON file 
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) { //Read file
            if(err){ 
                reject(err); //If error (like file doesnt exist) send an error back to index.js
            }
            else {
                resolve(JSON.parse(data)); //Return all parsed data
            }
        });
    },

    // Method for retrieving data with a specified 'name' field
    getByName: function(name, resolve, reject){
        fs.readFile(FILE_NAME, function (err, data) {
            if(err){
                reject(err);
            } else {
                let user = JSON.parse(data).find((user) => { //parse data and search all entries for a specific user id
                    return user.name == name
                });
                resolve(user); 
            }
        });
    },

    // Method for retrieving data with a specified ID field
    getById: function(id, resolve, reject) { 
        fs.readFile(FILE_NAME, function (err, data){ //Read file
            if(err){
                reject(err); //If error (like file doesnt exist) send an error back to index.js
            } else {
                let user = JSON.parse(data).find((user) => { //parse data and search all entries for a specific user id
                    return user.id == id
                });
                resolve(user); //return user if found or return an empty value
            }
        });
    },

    //Method for retrieving data based on an entered search object
    search: function(searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){ //Read file
            if(err){
                reject(err); //If error (like file doesnt exist) send an error back to index.js
            } else {
                let users = JSON.parse(data); //Parse data and set it to a variable
                if(searchObject){ //if searchObject is passed into method, continue 
                    // EXAMPLE Search Object = {
                        // "id": 200,
                        // "name": "J"
                    // }
                    users = users.filter((user) => //for every object in users, if id of search = id of users and the searchObject name/letter is in the users name, resolve that object
                        (searchObject.id ? user.id == searchObject.id : true) && (searchObject.name ? user.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true ));
                };
                resolve(users); //return user if found or return an empty value
            };
        });
    }

};

module.exports = userRepo; 