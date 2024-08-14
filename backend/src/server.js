const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log('O Backend está em execução na porta ' + process.env.PORT);
})