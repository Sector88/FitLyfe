const pool = require('../models/TrainerModel')

pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err)
  process.exit(-1)
});


const traineeController = {

  async getAllTrainees(req, res, next) {
    await pool.query(
      
      'SELECT * FROM client_table ORDER BY clientid ASC', 
      (err, results) => {
        // console.log(results.rows)
      if(err){
        console.log('GET ALL Trainees Controller Error:' + JSON.stringify(err))
      } else {
        res.locals.getAllTrainees = results.rows;
        console.log('GET ALL Trainees Controller SUCCESS' + ' the result ' + JSON.stringify(results.rows))
      }
    });
    return next();
  },

  async getOneTrainee(req, res, next) {
    const clientid =  req.params.clientid;
 
    await pool.query(
      
      'SELECT * FROM client_table WHERE clientid = $1',
      clientid,
      (err, results) => {

      if(err) {
        console.log('GET ONE Trainee Controller Error:' + JSON.stringify(err))
      } else {
        res.locals.getOneTrainee = results.rows;
        // console.log(res.locals.getOneTrainee)
        console.log('GET ONE Trainee Controller SUCCESS')
      }
    });
    return next();
  },

  async createTrainee(req, res, next) {
    const { contracts, firstname, lastname, email } = req.body;
    await pool.query(
      
      'INSERT INTO client_table (contracts, firstname, lastname, email) VALUES ($1, $2, $3, $4)',
      [contracts, firstname, lastname, email],
      (err, results) => {
        
        if(err) {
          console.log('CREATE Trainee Controller Error:' + JSON.stringify(err));
        } else {
        res.locals.createTrainee = req.body;
        console.log('res.locals', res.locals.createTrainee.firstname)
      }
    });
    return next();
  },

  async updateTrainee(req, res, next) {
    const clientid = req.params.clientid;
    const { firstname, lastname } = req.body;

    await pool.query(

      'UPDATE client_table SET firstname = $1, lastname = $2 WHERE clientid = $3',
      [firstname, lastname, clientid],
      (err, results) => {
      
      if (err) {
        console.log('UPDATE Trainee Controller Error:'+ JSON.stringify(err));
      } else {
        console.log('UPDATE Trainee Controller SUCCESS')
      }
    });
    return next();
  },


  async deleteTrainee(req, res, next) {
    const clientid = req.params.clientid;
    await pool.query(
      
      'DELETE FROM client_table WHERE clientid = $1', 
      [clientid], 
      (err, results) => {

      if (err) {
        console.log('DELETE Trainee Controller Error:'+ JSON.stringify(err));
      } else {
        console.log('DELETE Trainee Controller SUCCESS')
      }
    });
    return next();
  },
};

module.exports = traineeController;