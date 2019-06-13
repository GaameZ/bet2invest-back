const mysql = require("mysql");
const connection = require("./conf.js");
const axios = require("axios");

let testApi = [];

async function getUser() {
  try {
    const response = await axios.get("https://feeds.lengow.io/3/c6ppf");
    testApi = response.data;
  } catch (error) {
    console.error(error);
  }

  connection.connect();

  connection.beginTransaction(function(err) {
    if (err) {
      throw err;
    }

    connection.query("DELETE FROM ps_flux;", function(err, results, fields) {
      if (err) {
        connection.rollback(function() {
          throw err;
        });
      }

      let values = testApi.map(pari => {
        return [
          pari.event_description,
          pari.market_status,
          pari.outcome_price,
          pari.market_description,
          pari.period_description,
          pari.outcome_description,
          pari.event_path_1_description,
          pari.event_startDateTime,
          pari["event_@id"]
        ];
      });

      connection.query(
        "INSERT INTO ps_flux (event, status, cote, bet_type, period_type, result, competition, start_date, event_id) VALUES ?",
        [values],
        function(err, results, fields) {
          if (err) {
            connection.rollback(function() {
              throw err;
            });
          }
          connection.commit(function(err) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }
            console.log("Transaction Complete.");
            connection.end();
          });
        }
      );
    });
  });
}

getUser();
