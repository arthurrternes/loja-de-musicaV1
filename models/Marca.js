import conexao from '../config/conexao.js'

const Marca = conexao.Schema({
    nome: {type:String, required:true},
    tipInstrumentos:{type:String, required:true},
    anofundacao:{type:Number, required:true}
})

export default conexao.model('Marca',Marca)