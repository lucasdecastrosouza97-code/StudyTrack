const listaDisciplinas = [];
const listaRegistros = [];

class Disciplina {
    constructor(nome, metaHorario) {
        this.nome = nome;
        this.metaHorario = Number(metaHorario);
        this.horasRealizadas = 0;
    }
calcularPercentual(totalRealizado) {
        if (this.metaHorario <= 0) return 0;
        this.horasRealizadas = Number(totalRealizado);
        const progresso = (this.horasRealizadas/this.metaHorario)*100;
return Math.min(progresso, 100);
    }
}
const totalPrevisto = document.getElementById("total-previsto");
const totalRealizado = document.getElementById("total-realizado");
const botaoCalculo = document.getElementById("calculo");
const imagemResultado = document.getElementById("exibir-porcentagem");
const progressoHoras = document.getElementById("barra-progresso");
function CalcularPorcentagem () {
   const horasMeta = Number (totalPrevisto.value);
   const horasFeitas = Number (totalRealizado.value);
   if (horasMeta > 0) {
      const resultadoPorcentagem = (horasFeitas/horasMeta) * 100;
      imagemResultado.innerText = resultadoPorcentagem.toFixed(1);
      progressoHoras.value = resultadoPorcentagem;
   } else {
      alert ("Números negativos não contam!");
 }
}
botaoCalculo.addEventListener("click", CalcularPorcentagem);

class Metas {
   constructor (nome, cadastroMeta, cadastroMeta2) {
      this.nome=nome;
      this.cadastroMeta=cadastroMeta;
      this.cadastroMeta2=cadastroMeta2;
  }
}
const formulario = document.getElementById("form-metas");
const botaoMeta = document.getElementById("registro");
function suasMetas (evento) {
evento.preventDefault();
const meta1 = document.getElementById("form-meta").value;
const meta2 = document.getElementById("form-meta2").value;
const metaNova = new Metas ("Minhas metas",meta1, meta2);
console.log(metaNova);
}
formulario.addEventListener("submit",suasMetas);

class RegistroDeEstudo {
   constructor (nome, Disciplina, Data, Horas) {
   this.nome=nome;
   this.Disciplina=Disciplina;
   this.Data=new Date(Data);
   this.Horas=Number(Horas);
}
}
const formularioDisciplina = document.getElementById("form-disciplina");
const formularioData = document.getElementById("form-data");
const formularioHoras = document.getElementById("form-horas");
const botaoRegistro = document.getElementById("registrar");
function seuRegistro (evento) {
   const formDisciplinas = document.getElementById("form-disciplina").value;
   const formDatas = document.getElementById("form-data").value;
   const formTempo = document.getElementById("form-horas").value;
   const registroNovo = new RegistroDeEstudo("Meus Registros Estudantis", formDisciplinas, formDatas, formTempo);
   console.log(registroNovo);
   listaRegistros.push(registroNovo);
   console.log("Total de Registros:", listaRegistros.length);
   evento.target.reset();
}
document.getElementById("registro-horas").addEventListener("submit", seuRegistro);
function carregarEstudos () {
  const hoje = new Date();
  const seteDias = new Date();
  seteDias.setDate(hoje.getDate()-7);
let somaSemanal=0;
let somaMensal=0;

listaRegistros.forEach (registro=> {
 if (registro.Data.getMonth() === hoje.getMonth() && 
            registro.Data.getFullYear() === hoje.getFullYear()) {
            somaMensal += registro.Horas;
        }
if (registro.Data >= seteDias && registro.Data <= hoje) {
            somaSemanal += registro.Horas;
        }
    });
document.getElementById("horas-semana").value = somaSemanal;
document.getElementById("horas-mes").value = somaMensal;
}
document.getElementById("registrar-estudo").addEventListener("click", carregarEstudos);

function gerarRelatorioSimples() {
    if (listaRegistros.length === 0) return;
    const hoje = new Date();
    const seteDias = new Date();
    seteDias.setDate(hoje.getDate() - 7);
    let somaSemanal = 0;
    const ultimoRegistro = listaRegistros[listaRegistros.length - 1];
    listaRegistros.forEach(registro => {
        if (registro.Data >= seteDias && registro.Data <= hoje) {
            somaSemanal += registro.Horas;
        }
    });
    const metaAtingida = somaSemanal >=40 ? "Sim" : "Não";
    let porcentagemProd = 0;
    if (totalPrevisto.value > 0) {
        porcentagemProd = (totalRealizado.value / totalPrevisto.value) * 100;
    }
    document.getElementById("relatorio-disciplina").innerText = ultimoRegistro.Disciplina;
    document.getElementById("relatorio-progresso").innerText = porcentagemProd.toFixed(1);
    document.getElementById("relatorio-meta").innerText = metaAtingida;
    const corMeta = metaAtingida === "Sim" ? "#2ecc71" : "#e74c3c";
    document.getElementById("relatorio-meta").style.color = corMeta;
}
document.getElementById("registrar-estudo").addEventListener("click", gerarRelatorioSimples);































