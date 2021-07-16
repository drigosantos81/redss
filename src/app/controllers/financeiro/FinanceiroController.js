module.exports = {
  // ÍNICIO
  index(req, res) {
    try {
      console.log('FINANCEIRO');
      
      return res.render('financeiro/despesas/index');
      
    } catch (error) {
      console.log(error);
    }
  },

  async formDespesa(req, res) {
    try {
      console.log('Formulário de Novo Pagamento');
      
      return res.render('financeiro/despesas/form-inclui-pgto');
      
    } catch (error) {
      console.log(error);
    }
  }
}