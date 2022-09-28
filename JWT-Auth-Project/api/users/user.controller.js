const { hashSync } = require("bcrypt");
const {
  create,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} = require("./user.service");
const { genSaltSync } = require("bcrypt");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          sucess: 0,
          message: "Database connnection error",
        });
      }
      return res.status(200).json({
        sucess: 1,
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          sucess: 0,
          message: "Record not found!",
        });
      }
      return res.json({
        sucess: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        sucess: 1,
        data: results,
      });
    });
  },

  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(results);
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          sucess: 0,
          message: "failed to update user",
        });
      }
      return res.json({
        sucess: 1,
        message: "Updated sucessfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.affectedRows == 0) {
        return res.status(400).json({
          success: 0,
          message: "No record found for user id",
        });
      }
      return res.json({
        sucess: 1,
        message: "User deleted sucessfully ",
      });
    });
  },
};
