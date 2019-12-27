const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use("/api/", apiRoutes);

// use the listen function to get open the port
app.listen(PORT, function(){
    console.log(`app is listening on port: ${PORT}`);
});
