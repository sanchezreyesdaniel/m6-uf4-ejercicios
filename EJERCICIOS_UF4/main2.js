console.log('hola');

async function pokemons(){
    const ahora = new Date().getTime();
    let html ='';
    for(let i = 1; i <= 13; i++){
        try{
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const respJ = await res.json();
            console.log('NOMBRE', respJ.name);
            html +=
            ` 
            <div class="col-md-2">
                <div class="card shadow">
                    <img src="${respJ.sprites.front_default}" class="card-img-top" alt="${respJ.name}">
                    <div class="card-body">
                        <h5 class="card-title">NOMBRE: ${respJ.name}</h5>
                        <div class="card-text">ID:${respJ.id}</div>
                        <div class="card-text">TIPOS: ${respJ.types.map(type => type.type.name).join(', ')}</div>
                        <div class="card-text">PESO:${respJ.weight}</div>
                        <div class="card-text">ALTURA:${respJ.height}</div>
                    </div>
                </div>
            </div>
            `;
        } catch(error){
            console.log('ha ocurrido un error', error);
        }
    }
    console.log(html);
    document.querySelector('#pokemons').innerHTML = html
    
    console.log('time2:', new Date().getTime() - ahora, 'milisegundos');
    document.querySelector('#tiempo1').innerHTML = (new Date().getTime() - ahora )
}

// pokemons();
document.querySelector('#ejer1').addEventListener('click',pokemons)

function pokemons2() {
    const ahora = new Date().getTime();
    console.log('time:', ahora);
    let html= ''
    for(let i=1; i<13; i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(resp => resp.json())
        .then(respJSON =>{
            // console.log(respJSON)
            // console.log('NOMBRE EN CASCADA',respJSON.name)
            html += //html
            `
            <div class="col-md-2">
            <div class="card shadow">
                <img src="${respJSON.sprites.front_default}" alt="Bulbasaur">
                <div class="card-body">
                    <h5 class="card-title">${respJSON.name}</h5>
                    <div class="card-text">ID: ${respJSON.id}</div>
                    <div class="card-text">Tipo:${respJSON.types.map(type => type.type.name).join(', ')}</div>
                    <div class="card-text">Peso: ${respJSON.weight}</div>
                    <div class="card-text">Altura: ${respJSON.height}</div>
                    </div>
                </div>
            </div>
            `
            document.querySelector('#pokemons').innerHTML = html
        })
    }
    
    console.log('time2:', new Date().getTime() - ahora, 'milisegundos');
    document.querySelector('#tiempo2').innerHTML = (new Date().getTime() - ahora )
}


document.querySelector('#ejer2').addEventListener('click',pokemons2)


async function leerPokemonConPromise() {
    let html = '';
    const ahora = new Date().getTime();
    console.log('time:', ahora);
    const arrayPokemons = [];

    // llenamos array con peticiones asíncronas
    for (let i = 0; i < 13; i++) {
        arrayPokemons[i] = fetch(`https:/pokeapi.co/api/v2/pokemon/${i + 1}`).then(resp => resp.json());
    }

    console.log('Array de pokemons: ', arrayPokemons); //=> array de promesas

    // Guardamos en respuestas las promesas una vez se han resuelto TODAS
    const respuestas = await Promise.all(arrayPokemons);

    respuestas.forEach(respJSON => {
        html += `
            <div class="col-md-2">
                <div class="card shadow">
                    <img src="${respJSON.sprites.front_default}" alt="Bulbasaur">
                    <div class="card-body">
                        <h5 class="card-title">${respJSON.name}</h5>
                        <div class="card-text">ID: ${respJSON.id}</div>
                        <div class="card-text">Tipo:${respJSON.types.map(type => type.type.name).join(', ')}</div>
                        <div class="card-text">Peso: ${respJSON.weight}</div>
                        <div class="card-text">Altura: ${respJSON.height}</div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('#pokemons').innerHTML = html;

    console.log('arrayPokemons al finalizar todas las peticiones: ', respuestas[0]);
    console.log('time2:', new Date().getTime() - ahora, 'milisegundos');
    document.querySelector('#tiempo3').innerHTML = (new Date().getTime() - ahora )
}

document.querySelector('#ejer3').addEventListener('click',leerPokemonConPromise)