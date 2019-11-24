const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use("/api/", apiRoutes);


app.listen(PORT, function(){
    console.log(`app is listening on port: ${PORT}`);
});
