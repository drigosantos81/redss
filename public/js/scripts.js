const Validate = {
  apply(input, func) {
    Validate.clearErrors(input);

    let results = Validate[func](input.value);
    input.value = results.value;

    if (results.error) {
      Validate.displayError(input, results.error);
      input.focus();
    }        
  },
  clearErrors(input) {
    const errorDiv = input.parentNode.querySelector('.error');

    if (errorDiv) {
      errorDiv.remove();
      input.style.border = "1px solid #DDDDDD";
    }
  },
  displayError(input, error) {
    const div = document.createElement('div');

    div.classList.add('error');
    div.innerHTML = error;
    
    input.parentNode.appendChild(div);

    input.style.border = "1px solid red";
    input.focus();
  },
  isEmail(value) {
    let error = null;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value.match(mailFormat)) {
      error = 'E-mail inválido';
    }

    return {
      error,
      value
    }
  }
}

const Mask = {
  apply(input, func) {
    setTimeout(function() {
      input.value = Mask[func](input.value);
    }, 1);
  },
  formatBRL(value) {
    value = value.replace(/\D/g,"");

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value/100); 
  },
  data(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 8) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{2})(\d)/, "$1/$2"); // 14/062021
    value = value.replace(/(\d{2})(\d)/, "$1/$2"); // 14/06/2021

    return value;
  },
  nPis(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 11) {
      value = value.slice(0, -1);
    }

    value = value.replace(/^(\d{3})(\d)/, "$1.$2"); // 111.22222334
    value = value.replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3"); // 111.22222.334
    value = value.replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3-$4"); // 111.22222.33-4

    return value;
  },
  cei(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 12) {
      value = value.slice(0, -1);
    }

    value = value.replace(/^(\d{2})(\d)/, "$1.$2"); // 11.2223333344
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); // 11.222.3333344
    value = value.replace(/^(\d{2})\.(\d{3})\.(\d{5})(\d)/, "$1.$2.$3/$4"); // 11.222.33333/44

    return value;
  },
  cpf(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 11) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 111.22233344
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 111.222.33344
    value = value.replace(/(\d{3})(\d)/, "$1-$2"); // 111.222.333-44

    return value;
  },
  cnpj(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 14) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{2})(\d)/, "$1.$2"); // 11.222333444455
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 11.222.333444455
    value = value.replace(/(\d{3})(\d)/, "$1/$2"); // 11.222.333/444455
    value = value.replace(/(\d{4})(\d)/, "$1-$2"); // 11.222.333/4444-55

    return value;
  },
  titulo(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 12) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{4})(\d)/, "$1 $2"); // 1111 22223333
    value = value.replace(/(\d{4})(\d)/, "$1 $2"); // 1111 22222 3333

    return value;
  },
  zonaSecao(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 3) {
      value = value.slice(0, -1);
    }

    return value;
  },
  cpfCnpj(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 14) {
      value = value.slice(0, -1);
    }

    // Checa se é CPF ou CNPJ
    if (value.length > 11) {
      value = value.replace(/(\d{2})(\d)/, "$1.$2"); // 11.222333444455
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 11.222.333444455
      value = value.replace(/(\d{3})(\d)/, "$1/$2"); // 11.222.333/444455
      value = value.replace(/(\d{4})(\d)/, "$1-$2"); // 11.222.333/4444-55
    } else {
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 111.22233344
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 11.222.33344
      value = value.replace(/(\d{3})(\d)/, "$1-$2"); // 11.222.333-44
    }

    return value;
  },
  cep(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 8) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{2})(\d)/, "$1.$2"); // 11.222333
    value = value.replace(/(\d{3})(\d)/, "$1-$2"); // 11.222-333

    return value;
  },
  telefone(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 10) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{2})(\d)/, "($1) $2"); // (11) 22223333
    value = value.replace(/(\d{4})(\d)/, "$1-$2"); // (11) 2222-3333
    
    return value;
  },
  celular(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 11) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{2})(\d)/, "($1) $2"); // (11) 22223333
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // (11) 22222-3333
    
    return value;
  },  
  conta(value) {
    value = value.replace(/\D/g,"");

    if (value.length > 12) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{11})(\d)/, "$1-$2"); // 1111 22223333
    // value = value.replace(/(\d{4})(\d)/, "$1 $2"); // 1111 22222 3333

    return value;
  },
}

function alertDelete() {
  const formDelete = document.querySelector("#form-delete");
  formDelete.addEventListener("submit", function(event) {
    const confirmation = confirm("Deseja mesmo deletar este registro?");
    if (!confirmation) {
        event.preventDefault();
    }
  });
}

// function salarioFuncao() {
//   const funcaoSelected = document.querySelector("#selectFuncao").value;
//   if (funcaoSelected == "Pedreiro") {
//     document.getElementById("valorSalario").value = 1910.65;
//   } else if (funcaoSelected == "Ajudante Comum") {
//     document.getElementById("valorSalario").value = 1128.34;
//   } else {
//     document.getElementById("valorSalario").value = 900.00;
//   }
  
//   console.log('Formulário do Funcionário!');  
// }

// *******************************************

// function showFunc() {
	// const tbodyFunc = document.querySelector('.tbody-func');
	// const trFuncs = document.getElementsByTagName('tr');
	// for (let trFunc of trFuncs) {
  //   trFunc.addEventListener("click", function() {
  //     const dataFunc = trFunc.getAttribute("id");
  //     window.location.href = `/cadastros/funcionarios/funcionario/${dataFunc}`;
  //   });
	// }
// }