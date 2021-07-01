module.exports = {
  // ÍNICIO
  index(req, res) {
    try {
      console.log('Fornecedores');
      
      return res.render('cadastros/fornecedores');
      
    } catch (error) {
      console.log(error);
    }
  }
}