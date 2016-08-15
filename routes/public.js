//public site routes to send back the index.html page.
module.exports = function(app){
    app.get('/', (req, res) => {
        res.render('../public/index.html');
    });
};