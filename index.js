const express = require('express');
const app = express(); 
let router = express.Router();

// Import userRepo to access search methods
const userRepo = require('./repos/userRepo.js');

// Default Port port or use next available 
const PORT = 8080 || process.env.PORT; 

// Base Route
app.use('/api/', router); 

// Additional routes
// Show all route
router.get('/', (req, res, next) => {
    userRepo.get((data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK", 
            "message": "All data retrieved", 
            "data": data
        });
    }, (err) => {
        next(err);
    });
});

// Sort by name and id route (searchObject)
router.get("/search", function(req, res, next) {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };
    userRepo.search(searchObject, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        });
    }, function(err){
        next(err);
    });
});

// Sort by name route
router.get('/:name', (req, res, next) => {
    userRepo.getByName(req.params.name, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Single user retrieved",
            "data": data
        });
    }, function(err){
        next(err);
    });
});

// Sort by ID route
router.get("/:id", (req, res, next) => {
    userRepo.getById(req.params.id, (data) => {
        if(data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single user retrieved",
                "data": data
            })
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": `The user with ${req.params.id} could not be found.`,
                "error": {
                    "code": "NOT_FOUND",
                    "message": `The user with ${req.params.id} could not be found.`
                }
            });
        };
    });
});

// Start Server on port 8080 if available 
app.listen(PORT, function () {
    console.log('Server is running on port: ' + PORT); 
});