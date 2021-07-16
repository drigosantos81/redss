module.exports = {
  // ÍNICIO
  index(req, res) {
    try {
      console.log('Fornecedores');
      
      return res.render('cadastros/fornecedores/index');
      
    } catch (error) {
      console.log(error);
    }
  }
}