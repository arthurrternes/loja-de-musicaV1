import conexao from '../config/conexao.js'

const Instrumento = conexao.Schema({
    nome: {type:String, required:true},
    categoria:{type:String, required:true},
    preco:{type:Number, required:true},
    nivel:{type:String, required:true}
})

export default conexao.model('instrumento',Instrumento)