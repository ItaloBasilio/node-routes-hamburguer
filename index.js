// Conexao

const express = require ('express');
const app = express();
const uuid = require('uuid');
const port = 3000;

const orders = []

app.use(express.json()); // Para análise de corpos JSON
app.use(express.urlencoded({ extended: true })); //

// Interceptador

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = orders.findIndex(order => order.id === id)


    if (index < 0) {
        return response.status(400).json({ error: "User Note Found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


//rota que irá receber as ordens
app.get('/orders', (request, response) => {
    return response.json(orders);
});

// Rota para alterar os pedidos feitos
app.put('/orders/:id', checkUserId, (request, response) => {
    const { order, clientName, price , status } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, order, clientName, price , status }

    orders[index] = updateUser

    return response.json(updateUser);

});

//rota para deletar pedidos
app.delete('/orders/:id', checkUserId, (request, response) => {

    const index = request.userIndex
    //deletar itens do array a partir de um indice
    orders.splice(index, 1)

    return response.status(204).json();
});



// Rota para criar pedidos
app.post('/orders', (request, response) => {
    const { order, clientName, price, status } = request.body;

    //console.log(uuid.v4())
    const orderId = { id: uuid.v4(), order, clientName, price , status  };
    orders.push(orderId); // para adicionar o usuario no array

    return response.status(201).json({id: uuid.v4(),order, clientName, price, status   } ); // inseri user para retornar somente o usuario que eu criar

    // criado o status 201 para ficar mais semantico
});






//mensagem do servidor
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(uuid.v4());
});