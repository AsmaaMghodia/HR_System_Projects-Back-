const mongoose = require("mongoose");
const projectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    projectRate: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    employees: {
        type: [String],
        required: true
    }
});
const projects = mongoose.model("projects", projectsSchema);
// note that we use a pascal naming convention for model
module.exports = projects;