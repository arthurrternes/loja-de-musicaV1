//importar o Model
import Marca from '../models/Marca.js'

export default class marcaController{

    constructor(caminhoBase='marca/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Marca
           
            await Marca.create({
                nome: req.body.nome,
                tipInstrumentos:req.body.tipInstrumentos,
                anofundacao:req.body.anofundacao
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Marca.find({})
            res.render(caminhoBase + 'lst', {marcas:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const marca = await Marca.findById(id)
            res.render(caminhoBase + "edt", {marca})
        }
        this.edt = async(req, res)=>{
        await Marca.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Marca.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }
        

    }
}