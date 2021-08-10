const { Router } = require('express');
const router = Router();
const _ = require('underscore');

//Importamos el Json de espacios
const spaces = require('./spaces.json');
console.log(spaces);

//Ruta GET Espacios
router.get('/', (req, res) =>{
    res.json(spaces);//Envio los Espacios
})

//Ruta GET Espacios por ID
router.get('/:id', (req, res) =>{
    const { id } = req.params;//Obtengo el id
    if(id){
        _.each(spaces, (space, index) =>{
            if(space.id == id){
                res.json(space);//Retorno el espacio correspondiente.
            }
        })
    }else{
        res.status(500).json({error: 'Datos incompletos'});
    }
})

//Ruta POST Espacios
router.post('/', (req, res) =>{   
    let tempId = spaces.length + 1; //Se crea ID
    const id = tempId.toString()
    const {state} = req.body;
    const newSpace = {id, ...req.body};//Se concatena ID
    if(id && state){    
        console.log('Nuevo Espacio: ', newSpace);//Print nuevo Espacio
        spaces.push(newSpace);
        res.json(spaces);
    }else{
        res.status(500).json({error: 'Datos incompletos'});
    }
    
})

//Ruta DELETE Espacios
router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    
    if(id){
        _.each(spaces, (space, index) =>{//Recorro la lista de espacios.
            if(space.id == id && space.state == "free"){
                spaces.splice(index, 1);
            }
        });
        res.json(spaces);
    }else{
        res.status(500).json({error: 'Datos incompletos'});
    }   
    
});

//Ruta PUT
router.put('/:id', (req, res) =>{
    const { id } = req.params;
    const { state } = req.body;
    if(id && state){//Verificar la existencia de id y state
        _.each(spaces, (space, index) =>{
            if(space.id === id){
                space.state = state //Se actualiza el estado del espacio
            }
        });
        res.json(spaces);
    }else{
        res.status(500).json({error: 'Datos incompletos'});
    }
})

//Export
module.exports = router;