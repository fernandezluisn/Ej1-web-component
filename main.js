class NuevoComponente extends HTMLElement{
    constructor(){
        super();
        
        let referencia=this.attachShadow({mode:'closed'});
        //document.querySelector('app-nc').shadowRoot.querySelector('div').querySelector('h1').textContent="Me cambiaron el texto";

        this.divSuperior = document.createElement("div");
        

        this.nuevoTitulo = document.createElement("h1");
        this.nuevoTitulo.textContent="Soy un titulo";

        referencia.appendChild(this.divSuperior);
        this.divSuperior.appendChild(this.nuevoTitulo);

        this.nuevoTitulo.style.color="red";
        
    }

    connectedCallback(){
        this.parrafo=document.createElement("p");
        this.parrafo.innerHTML=this.getAttribute("texto");
        this.divSuperior.appendChild(this.parrafo);    
        

        
    }
}

customElements.define("app-nc",NuevoComponente);

class Lista extends HTMLElement{
    constructor(){
        super();
        let referencia=this.attachShadow({mode:'open'});

        this.divSuperior = document.createElement("div");
        this.divInferior=document.createElement("div");

        this.nuevoSubTitulo = document.createElement("h2");        

        referencia.appendChild(this.divSuperior);
        this.divSuperior.appendChild(this.nuevoSubTitulo);


        referencia.appendChild(this.divInferior);
    }

    connectedCallback(){
        this.parrafo=document.createElement("p");
        this.parrafo.innerHTML=this.getAttribute("texto");
        let atributo= this.getAttribute("campo");

        this.divSuperior.appendChild(this.parrafo);

        let servicio= this.getAttribute("url");
        
        fetch(servicio).then(response=>response.json())        
        .then(json=>json.results.forEach(element => {

            
            this.divInferior.innerText+= element[atributo];        


            this.divInferior.appendChild(document.createElement("br"));
        }));   

        
    }

    
}


customElements.define("app-lista",Lista);



class CustomCard extends HTMLElement {
    constructor() {
        super();

        // Crear el shadow root
        const shadow = this.attachShadow({ mode: 'open' });

                // Obtener el template
        const template = document.getElementById('card-template');

                // Clonar el contenido del template
        const templateContent = template.content.cloneNode(true);

                // Adjuntar el contenido clonado al shadow DOM
        shadow.appendChild(templateContent);
    }
}

        // Definir el custom element
customElements.define('custom-card', CustomCard);

function createCard(title, imgUrl) {
    const card = document.createElement('custom-card');

    const titleSpan = document.createElement('span');
    titleSpan.setAttribute('slot', 'title');
    titleSpan.textContent = title;

    const img = document.createElement('img');
    img.setAttribute('slot', 'content');
    img.setAttribute('src', imgUrl);
    img.setAttribute('alt', title);

    card.appendChild(titleSpan);
    card.appendChild(img);

    return card;
}

// Obtener datos de la PokeAPI y generar las cartas
async function generateCards() {
    const container = document.getElementById('muestrario');

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();

        for (const pokemon of data.results) {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            const card = createCard(pokemonData.name, pokemonData.sprites.front_default);
            container.appendChild(card);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// Generar las cartas al cargar la página
window.onload = generateCards;

