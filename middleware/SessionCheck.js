const checkSession = (req, res, next) => {
    if (!req.session || !req.session.user) {
      // Redirect to the login page if the session is not present or user is not logged in
      return res.redirect('/login');
    }
    // Continue to the next middleware or route handler
    next();
  };


// ----  check for admin -----
const isAdmin = (req, res, next) => {
  const user = req.session.user;
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).send(`
    <html>
      <head>
        <title>403 Forbidden</title>
      </head>
      <body>
        <h1>403 Forbidden</h1>
        <p>You do not have permission to access this page.</p>
        <p><a href="http://localhost:3000/">Go to Home Page</a></p>
      </body>
    </html>
  `);
  }
};

  
module.exports = { checkSession, isAdmin };



