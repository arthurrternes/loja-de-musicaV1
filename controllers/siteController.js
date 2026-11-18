import Instrumento from '../models/Instrumento.js'
import Categoria from '../models/Categoria.js'
import Marca from '../models/Marca.js'
import Fornecedor from '../models/Fornecedor.js'

export default class siteController {

    constructor() {

        this.index = async (req, res) => {
            const categorias = await Categoria.find({})
            const destaques = await Instrumento.find({}).limit(4).populate('marca')

            // pra cada categoria, pega um instrumento pra usar a foto no card
            const cards = []
            for (const categoria of categorias) {
                const exemplo = await Instrumento.find({ categoria: categoria._id }).limit(1)
                cards.push({
                    id: categoria.id,
                    nome: categoria.nome,
                    foto: exemplo.length > 0 ? exemplo[0].foto : null
                })
            }
            res.render('site/index', { categorias, destaques, cards });
        };

        this.conta = async (req, res) => {
            const categorias = await Categoria.find({})
            res.render('site/conta', { categorias });
        };

        // lista todos, ou so os de uma categoria (id vem na url)
        this.catalogo = async (req, res) => {
            const categorias = await Categoria.find({})
            let titulo = 'Todos os instrumentos'
            let instrumentos
            if (req.params.categoria) {
                const categoria = await Categoria.findById(req.params.categoria)
                titulo = categoria.nome
                instrumentos = await Instrumento.find({ categoria: req.params.categoria })
                    .populate('categoria').populate('marca')
            } else {
                instrumentos = await Instrumento.find({})
                    .populate('categoria').populate('marca')
            }
            res.render('site/catalogo', {
                categorias, instrumentos, titulo,
                categoriaSel: req.params.categoria || '', nivelSel: '', q: ''
            });
        };

        // filtros enviados pelo formulario (categoria, nivel e busca por nome)
        this.filtrar = async (req, res) => {
            const categorias = await Categoria.find({})
            const filtro = {}
            let titulo = 'Todos os instrumentos'

            if (req.body.categoria) {
                filtro.categoria = req.body.categoria
                const categoria = await Categoria.findById(req.body.categoria)
                titulo = categoria.nome
            }
            if (req.body.nivel) {
                filtro.nivel = { $regex: req.body.nivel, $options: "i" }
            }
            if (req.body.q) {
                filtro.nome = { $regex: req.body.q, $options: "i" }
            }

            const instrumentos = await Instrumento.find(filtro)
                .populate('categoria').populate('marca')
            res.render('site/catalogo', {
                categorias, instrumentos, titulo,
                categoriaSel: req.body.categoria || '',
                nivelSel: req.body.nivel || '',
                q: req.body.q || ''
            });
        };

        this.checkout = async (req, res) => {
            const categorias = await Categoria.find({})
            res.render('site/checkout', { categorias });
        };

        this.produto = async (req, res) => {
            const categorias = await Categoria.find({})
            const instrumento = await Instrumento.findById(req.params.id)
                .populate('categoria')
                .populate('marca')
                .populate('fornecedor')
            if (instrumento == null) {
                return res.redirect('/site/catalogo')
            }
            res.render('site/produto', { categorias, instrumento });
        };

        this.pedidos = async (req, res) => {
            const categorias = await Categoria.find({})
            res.render('site/pedidos', { categorias });
        };

        this.carrinho = async (req, res) => {
            const categorias = await Categoria.find({})
            res.render('site/carrinho', { categorias });
        };

    }
}
