//importar o Model
import Instrumento from '../models/Instrumento.js'

export default class instrumentoController{

    constructor(caminhoBase='instrumento/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Instrumento
           
            await Instrumento.create({
                nome: req.body.nome,
                categoria: req.body.categoria,
                preco: req.body.preco,
                nivel: req.body.nivel
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Instrumento.find({})
            res.render(caminhoBase + 'lst', {Instrumentos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Instrumento.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Instrumentos:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const instrumento = await Instrumento.findById(id) 
            console.log(instrumento)
            res.render(caminhoBase + "edt", 
                {Instrumento:instrumento})
        }


        this.edt = async(req, res)=>{
        await Instrumento.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Instrumento.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}