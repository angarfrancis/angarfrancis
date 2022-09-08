const Users = require("../models").user;
const bcrypt = require("bcrypt");

module.exports = () => {
    Users.addHook("beforeCreate", "update", async user => {
        if(user.password && user.password.length > 0){
        const salt = await bcrypt.genSalt(5);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });
}