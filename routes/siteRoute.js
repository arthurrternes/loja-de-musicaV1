import express from 'express';
const router = express.Router();
import siteController from '../controllers/siteController.js'
const controle = new siteController();


const caminhobase = 'site/'

router.get('/' + caminhobase , controle.index)
router.get('/' + caminhobase + 'conta', controle.conta)
router.get('/' + caminhobase + 'catalogo', controle.catalogo)
router.get('/' + caminhobase + 'checkout', controle.checkout)
router.get('/' + caminhobase + 'produto', controle.produto)
router.get('/' + caminhobase + 'pedidos', controle.pedidos)
router.get('/' + caminhobase + 'carrinho', controle.carrinho)
router.post('/' + caminhobase + 'carrinho', controle.carrinho)
export default router