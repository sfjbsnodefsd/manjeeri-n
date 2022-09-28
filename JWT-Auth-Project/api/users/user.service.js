const pool = require("../../config/database");

module.exports = {
  // if we get error it will be passed as data and callback will be null
  // if execution is sucessful then call back will have data
  create: (data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, gender, email, password, number) 
            values(?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUsers: (callBack) => {
    pool.query(
      `select id,firstname,lastname,gender,email,number from resgistartion`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserById: (id,callBack) => {
    pool.query(
      `select id,firstname,lastname,gender,email,number from resgistartion where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
