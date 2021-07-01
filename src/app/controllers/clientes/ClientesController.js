module.exports = {
  // ÍNICIO
  index(req, res) {
    try {      
      return res.render('cadastros/clientes/index');
      
    } catch (error) {
      console.log(error);
    }
  }
}