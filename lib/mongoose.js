'use strict'
const mongoose = require("mongoose");
const config    = require('../config');

// read from node env
const mode =  process.env.NODE_ENV || "development";
mongoose.connect(
        config.get(mode.concat(":", "mongoose:uri")),
        config.get(mode.concat(":", "mongoose:options"))
);
module.exports = mongoose;