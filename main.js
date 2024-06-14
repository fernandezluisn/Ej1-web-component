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
