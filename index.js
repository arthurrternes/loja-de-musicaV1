import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import instrumentoRoutes from './routes/instrumentoRoute.js'; // rotas externas
import categoriaRoutes from './routes/categoriaRoute.js'; // rotas externas
import fornecedorRoutes from './routes/fornecedorRoute.js'; // rotas externas
import marcaRoutes from './routes/marcaRoute.js'; // rotas externas

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(routes)
app.use(instrumentoRoutes)
app.use(categoriaRoutes)
app.use(fornecedorRoutes)
app.use(marcaRoutes)
app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
// Exporta o handler compatível com Vercel
export default app;