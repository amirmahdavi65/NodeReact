const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align:center;">
          <h3>We'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}">Yes</a>
            <a href="${keys.redirectDomain}">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
