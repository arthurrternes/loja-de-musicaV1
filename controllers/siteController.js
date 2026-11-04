
export default class siteController {

    constructor() {

        this.index = async (req, res) => {
            res.render('site/index');
        };

        this.conta = (req, res) => {
            res.render('site/conta');
        };

        this.catalogo = (req, res) => {
            res.render('site/catalogo');
        };

        this.checkout = (req, res) => {
            res.render('site/checkout');
        };

        this.produto = (req, res) => {
            res.render('site/produto');
        };

        this.pedidos = (req, res) => {
            res.render('site/pedidos');
        };

        this.carrinho = (req, res) => {
            res.render('site/carrinho');
        };

    }
}