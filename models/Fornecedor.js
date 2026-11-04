import conexao from '../config/conexao.js'

const Fornecedor = conexao.Schema({
    nome: {type:String, required:true},
    cnpj: {type:String, required:true}
})

export default conexao.model('Fornecedor',Fornecedor)