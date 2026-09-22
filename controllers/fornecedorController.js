//importar o Model
import Fornecedor from '../models/Fornecedor.js'

export default class fornecedorController{

    constructor(caminhoBase='fornecedor/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Fornecedor
           
            await Fornecedor.create({
                nome: req.body.nome,
                cnpj: req.body.cnpj
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Fornecedor.find({})
            res.render(caminhoBase + 'lst', {fornecedors:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Fornecedor.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {fornecedors:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const fornecedor = await Fornecedor.findById(id)
            res.render(caminhoBase + "edt", {fornecedor})
        }

             this.edt = async(req, res)=>{
            await Fornecedor.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');
                
        }
        
            this.del = async(req, res)=>{
            await Fornecedor.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');
                
        }
        

    }
}