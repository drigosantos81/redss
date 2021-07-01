module.exports = {
  // ÍNICIO
  index(req, res) {
    try {      
      return res.render('home-search/index');
      
    } catch (error) {
      console.log(error);
    }
  },

  header(req, res) {
    try {      
      return res.render('parts/header');
      
    } catch (error) {
      console.log(error);
    }
  }
}