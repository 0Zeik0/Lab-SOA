const { Router } = require('express');
const router = Router();
const _ = require('underscore');

//Importamos el Json de reservaciones
const reservations = require('./reservations.json');
const spaces = require('./spaces.json');
console.log(spaces);
console.log(reservations);

//Ruta GET de Reservaciones
router.get('/', (req, res) =>{
    res.json(reservations);
});

//Ruta POST de Reservaciones
router.post('/', (req, res) =>{
    let hTemp = new Date();
    let mTemp = new Date();
    let hour = hTemp.getHours().toString();
    let minutes = mTemp.getMinutes().toString();
    const time = hour + ":" + minutes
    let tempID = reservations.length + 1;
    const id = tempID.toString();
    const {plate} = req.body;

    if(plate){//Verifica la existencia de la placa
        let reserved = 1;
        _.each(spaces, (space, index) =>{
            if(space.state == "free" && reserved == 1){
                const idSpace = space.id;
                const newReservation = {id, idSpace, time, ...req.body};
                reservations.push(newReservation);
                space.state = "in-use";
                console.log('Nueva Reservación: ', newReservation);
                reserved = 0;
                
            }
                      
        });
        res.json(reservations);
        
        
    }else{
        res.status(500).json({error: 'Datos incompletos'});
    }
})

//Ruta DELETE de Reservaciones
router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    if(id){
        _.each(reservations, (reservation, index) =>{
            if(reservation.id == id){
                reservations.splice(index, 1);
                _.each(spaces, (space, i) =>{
                    if(space.id == reservation.idSpace){
                        space.state = "free";
                    }
                })
            }
        });
        res.json(reservations);
    }else{
        res.status(500).json({error: 'Datos incompletos'});
    }
});
module.exports = router;