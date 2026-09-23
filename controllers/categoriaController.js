//importar o Model
import Categoria from '../models/Categoria.js'

export default class categoriaController{

    constructor(caminhoBase='categoria/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Categoria
           
            await Categoria.create({
                nome: req.body.nome
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Categoria.find({})
            res.render(caminhoBase + 'lst', {categorias:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await
            Categoria.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {categorias:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const categoria = await Categoria.findById(id)
            res.render(caminhoBase + "edt", {categoria})
        }
         this.edt = async(req, res)=>{
         await Categoria.findByIdAndUpdate(req.params.id, req.body)
         res.redirect('/'+caminhoBase + 'lst');
         
         }
 
          this.del = async(req, res)=>{
         await Categoria.findByIdAndDelete(req.params.id)
         res.redirect('/'+caminhoBase + 'lst');
         
         }       
        

    }
}