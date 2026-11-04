import express from 'express';
import multer from 'multer';
const router = express.Router();
//Busca o InstrumentoController
import instrumentoController from '../controllers/instrumentoController.js'
const controle = new instrumentoController();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'instrumento/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.single('foto'), controle.edt)
export default router