//importar o Model
import Instrumento from '../models/Instrumento.js'
import Categoria from '../models/Categoria.js'
import Marca from '../models/Marca.js'
import Fornecedor from '../models/Fornecedor.js'

export default class instrumentoController{

    constructor(caminhoBase='instrumento/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            // Buscar as entidades relacionadas pra popular os selects
            const categorias = await Categoria.find({})
            const marcas = await Marca.find({})
            const fornecedores = await Fornecedor.find({})
            res.render(caminhoBase + "add", {
                Categorias:categorias,
                Marcas:marcas,
                Fornecedores:fornecedores
            })
        }
        this.add = async(req, res)=>{
            //cria o Instrumento

            let jcategoria = null;
            if(req.body.categoria){
                jcategoria = await Categoria.findById(req.body.categoria)
            }
            let jmarca = null;
            if(req.body.marca){
                jmarca = await Marca.findById(req.body.marca)
            }
            let jfornecedor = null;
            if(req.body.fornecedor){
                jfornecedor = await Fornecedor.findById(req.body.fornecedor)
            }

            let fotoEnviada
            if(req.file!=null){
                fotoEnviada = req.file.buffer
            }
            else{
                fotoEnviada = null
            }

            await Instrumento.create({
                nome: req.body.nome,
                categoria: jcategoria,
                marca: jmarca,
                fornecedor: jfornecedor,
                preco: req.body.preco,
                nivel: req.body.nivel,
                foto: fotoEnviada
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Instrumento.find({})
                .populate('categoria')
                .populate('marca')
                .populate('fornecedor')
            res.render(caminhoBase + 'lst', {Instrumentos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await
            Instrumento.find({ nome: { $regex: filtro,
                $options: "i" }})
                .populate('categoria')
                .populate('marca')
                .populate('fornecedor')
            res.render(caminhoBase + 'lst', {Instrumentos:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const instrumento = await Instrumento.findById(id)
            const categorias = await Categoria.find({})
            const marcas = await Marca.find({})
            const fornecedores = await Fornecedor.find({})
            res.render(caminhoBase + "edt", 
                {Instrumento:instrumento,
                Categorias:categorias,
                Marcas:marcas,
                Fornecedores:fornecedores})
        }


        this.edt = async(req, res)=>{
            let jcategoria = req.body.categoria ? await Categoria.findById(req.body.categoria) : null;
            let jmarca = req.body.marca ? await Marca.findById(req.body.marca) : null;
            let jfornecedor = req.body.fornecedor ? await Fornecedor.findById(req.body.fornecedor) : null;

            let fotoEnviada
            if(req.file!=null){
                fotoEnviada = req.file.buffer
            }
            else{
                //se nao mandou foto nova, mantem a que ja existia
                const instrumentoAtual = await Instrumento.findById(req.params.id).lean()
                fotoEnviada = instrumentoAtual.foto
            }

            await Instrumento.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                categoria: jcategoria,
                marca: jmarca,
                fornecedor: jfornecedor,
                preco: req.body.preco,
                nivel: req.body.nivel,
                foto: fotoEnviada
            })
            res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Instrumento.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}