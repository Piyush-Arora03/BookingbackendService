const express = require('express');
const { PORT } = require('./config/index');
const body_parser = require('body-parser');

const app = express();
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const SetUpAndStartServer = async () => {
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        // db.sequelize.sync({ alter: true });
    });

}

SetUpAndStartServer();