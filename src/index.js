const express = require('express');
const { PORT } = require('./config/index');
const body_parser = require('body-parser');
const { createChannel } = require('./utils/MessageQueue');

const app = express();
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const SetUpAndStartServer = async () => {
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    console.log("creating channel");
    await createChannel();
    console.log("channel created");
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        // db.sequelize.sync({ alter: true });
    });

}

SetUpAndStartServer();