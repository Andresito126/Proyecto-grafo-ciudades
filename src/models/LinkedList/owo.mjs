dijkstra(verticeInit){
    //Valores iniciales
    let l = [];
    let lp = [];
    let v = [];
    let d = [];
    let dp = [];
    let v1;
    
    //Agregando elementos a los respectivos arreglos 
    for(let i=0; i<this.#matrizAdyencia.length; i++){
      v[i] = i; // v1 => 0 , v2 => 1, v3 => 3
      lp[i] = v[i];
      d[i] = 10000;
    }

    v1 = v[this.#map.get(verticeInit)];
    d[v1] = 0;
    dp = d;

    while(l.length != v.length){
      let minimo = Math.min(...dp);
      l.push(minimo);

      for(let i=0; i<d.length; i++){
        if(d[i] != minimo){
          let suma = d[d.indexOf(minimo)] + this.#matrizAdyencia[d.indexOf(minimo)][i];

          if(d[i]>suma){
            d[i] = suma;
          }
        }
      }

      d[d.indexOf(minimo)] = null;
    }

    console.log(d);

}





}




