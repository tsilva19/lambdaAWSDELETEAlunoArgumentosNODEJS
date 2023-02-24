const mysql = require('mysql');

exports.handler = (event, context, callback) => {
  // Configurações de conexão com o banco de dados MySQL
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
  });

  // Parâmetros para exclusão do aluno
  const aluno_id = event.queryStringParameters.id;

  // Conexão com o banco de dados MySQL
  connection.connect();

  // Consulta SQL para exclusão do registro do aluno
  const sql = 'DELETE FROM alunos WHERE id=?';
  const params = [aluno_id];
  connection.query(sql, params, function (error, results, fields) {
    if (error) {
      console.log(error);
      // Fechar a conexão com o banco de dados MySQL
      connection.end();
      // Retornar um status code 400 e informações adicionais sobre o erro
      const response = {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ocorreu um erro ao excluir o aluno.' })
      };
      callback(null, response);
    } else {
      console.log(results);
      // Fechar a conexão com o banco de dados MySQL
      connection.end();
      // Retornar um status code 204 indicando que a exclusão foi bem-sucedida
      const response = {
        statusCode: 204
      };
      callback(null, response);
    }
  });
};
