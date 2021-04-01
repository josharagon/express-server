const { request, response } = require('express');
const express = require ('express');
const app = express();
const cars = require('./data.js');

app.use(express.json())

app.locals.title = 'Car List'
app.locals.cars = cars;

app.set('port', process.env.PORT || 3001);

app.get('/cars', (request, response) => {
    response.status(200).json(app.locals.cars);
})

app.get('/cars/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const foundItem = apps.locals.cars.find(car => car.id === id)

    if(!foundItem) {
        return response.status(404).json({message: `No car found with an id of ${id}`})
    } else {
        return response.status(200).json(foundItem);
    }
})

app.post('/cars', (request, response) => {

    const { body } = request;
    for(let requiredParam of ['make', 'model']) {
        if (!body[requiredParam]) {
            return response.status(422).json({message: `Reqyest body missing a required parameter of ${requiredParam}`})
        }
    }

    const newCar = { ...body, id: Date.now()}
    app.locals.cars.push(newCar)

})

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is listening on port ${app.get('port')}!`);
})