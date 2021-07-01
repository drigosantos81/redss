module.exports = {
  // ÍNICIO
  index(req, res) {
    try {
      console.log('Ínicio');
      
      return res.render('graficos/index');
      
    } catch (error) {
      console.log(error);
    }
  },

  async formFunc(req, res) {
    try {
      console.log('Formulário de Cadastro');
      
      return res.render('graficos/funcionarios');
      
    } catch (error) {
      console.log(error);
    }
  }
}