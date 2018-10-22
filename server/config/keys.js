module.exports = {
  mongoURI:
    process.env.mongoURI ||
    "mongodb://rohan123:rohan1234@ds237713.mlab.com:37713/atm_demo",
  port: process.env.PORT || 4000
};
