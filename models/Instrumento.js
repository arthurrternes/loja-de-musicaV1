import conexao from '../config/conexao.js'

const Instrumento = conexao.Schema({
    nome: {type:String, required:true},
    categoria:{type: conexao.Types.ObjectId, ref:"Categoria", required:false},
    marca:{type: conexao.Types.ObjectId, ref:"Marca", required:false},
    fornecedor:{type: conexao.Types.ObjectId, ref:"Fornecedor", required:false},
    preco:{type:Number, required:true},
    nivel:{type:String, required:true},
    foto:{type:Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
})

export default conexao.model('instrumento',Instrumento)