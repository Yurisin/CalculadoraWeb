onload = () => {
    document.querySelector('#btn0').onclick = () => digito(0);
    document.querySelector('#btn1').onclick = () => digito(1);
    document.querySelector('#btn2').onclick = () => digito(2);
    document.querySelector('#btn3').onclick = () => digito(3);
    document.querySelector('#btn4').onclick = () => digito(4);
    document.querySelector('#btn5').onclick = () => digito(5);
    document.querySelector('#btn6').onclick = () => digito(6);
    document.querySelector('#btn7').onclick = () => digito(7);
    document.querySelector('#btn8').onclick = () => digito(8);
    document.querySelector('#btn9').onclick = () => digito(9);
    document.querySelector('#btnVirgula').onclick = virgula;
    document.querySelector('#btnAC').onclick = limpa;
    document.querySelector('#btnDividir').onclick = () => operador('/');
    document.querySelector('#btnMultiplicar').onclick = () => operador('*');
    document.querySelector('#btnSubtrair').onclick = () => operador('-');
    document.querySelector('#btnSomar').onclick = () => operador('+');
    document.querySelector('#btnIgual').onclick = () => operador('=');

    

}

//Variaveis para armazenar o valor, operador e estado da calculadora

let sValor = '0'; //Valor do display ao iniciar calc
let ehNovoNumero = true; //Indica se o proximo digito sera de novo numero
let valorAnterior = 0; //Valor acumulado para operacao
let operacaoPendente = null; //operacao acumulada


//Atualiza Visor
const atualizarVisor = () => {
    let [parteInteira, parteDecimal] = sValor.split(',');
    let v = '';
    c = 0;
    for (let i = parteInteira.length - 1; i >= 0; i--) {
        if(++c > 3) {
            v = '.' + v;
            c = 1;
        }
        v = parteInteira[i] + v;
    }
    v = v +(parteDecimal ? ',' + parteDecimal : '');
    document.querySelector('#display').innerText = v;
}

const digito = (num) => {
    if(ehNovoNumero){
        sValor = '' + num;
        ehNovoNumero = false;
    }
    else sValor += num;
    atualizarVisor();
    
    if (sValor.length > 10) {
        alert('ERRO!' + ' Maximo de 10 Numeros!');
        valorAnterior = 0;
        operacaoPendente = null;
        sValor = '0';
        atualizarVisor();
    } 
}

//Virgula e decimal
const virgula = () => {
    if(ehNovoNumero){
        sValor = '0,';
        ehNovoNumero = false;
    } else if (sValor.indexOf(',')==-1) sValor += ',';
    atualizarVisor();
}

//Botao AC (All Clear)
const limpa = () => {
    ehNovoNumero = true;
    valorAnterior = 0;
    operacaoPendente = null;
    sValor = '0';
    atualizarVisor();
}

//Converte string de valor para numero
const valorAtual = () => parseFloat(sValor.replace(',', '.'));

//Operacao que sera realizada
const operador = (op) => {
    calcula();
    valorAnterior = valorAtual();
    operacaoPendente  = op;
    ehNovoNumero = true;
}

const calcula = () => {
    if(operacaoPendente != null) {
        switch(operacaoPendente) {
            case '+' : 
                resultado = valorAnterior + valorAtual(); 
                break;
            case '-' : 
                resultado = valorAnterior - valorAtual(); 
                break;
            case '*' : 
                resultado = valorAnterior * valorAtual(); 
                break;
            case '/' : 
                resultado = valorAnterior / valorAtual(); 
                break;
        }
        sValor = resultado.toString().replace('.', ',');
    } 
    ehNovoNumero = true;
    operacaoPendente = null;
    valorAnterior = 0;
    atualizarVisor();

}