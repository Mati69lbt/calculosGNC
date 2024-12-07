import { useState } from "react";
import "./App.css";

function App() {
  const [totalPersonas, setTotalPersonas] = useState(0);
  const [personasCervezaYGaseosa, setPersonasCervezaYGaseosa] = useState(0);
  const [personasSoloGaseosa, setPersonasSoloGaseosa] = useState(0);
  const [comida, setComida] = useState(0);
  const [cerveza, setCerveza] = useState(0);
  const [gaseosa, setGaseosa] = useState(0);
  const [numCervezas, setNumCervezas] = useState(0);
  const [numGaseosas, setNumGaseosas] = useState(0);
  const [resultados, setResultados] = useState(null);

  const calcular = () => {
    if (totalPersonas === 0 || comida === 0) {
      alert(
        "El total de personas y el costo de la comida deben ser mayores a 0."
      );
      return;
    }
    if (personasCervezaYGaseosa + personasSoloGaseosa !== totalPersonas) {
      alert(
        "La cantidad total de personas no coincide con la suma de los grupos."
      );
      return;
    }

    const totalCervezas = cerveza * numCervezas;
    const totalGaseosas = gaseosa * numGaseosas;
    const cuentaTotal = comida + totalCervezas + totalGaseosas;

    // Parte de comida que corresponde a cada persona
    const costoComidaPorPersona = comida / totalPersonas;

    // Grupo 1: Solo gaseosa
    const costoGaseosaPorPersona = totalGaseosas / totalPersonas;
    const pagoGrupo1PorPersona = costoComidaPorPersona + costoGaseosaPorPersona;

    // Grupo 2: Cerveza y gaseosa
    const costoCervezaPorPersona = totalCervezas / personasCervezaYGaseosa; // Dividido solo entre quienes toman cerveza
    const pagoGrupo2PorPersona =
      costoComidaPorPersona + costoCervezaPorPersona + costoGaseosaPorPersona;

    // Subtotales por grupo
    const subtotalGrupo1 = pagoGrupo1PorPersona * personasSoloGaseosa;
    const subtotalGrupo2 = pagoGrupo2PorPersona * personasCervezaYGaseosa;

    // Actualizar resultados
    setResultados({
      cuentaTotal: cuentaTotal.toFixed(2),
      grupo1: pagoGrupo1PorPersona.toFixed(2),
      grupo2: pagoGrupo2PorPersona.toFixed(2),
      subtotalCerveceros: subtotalGrupo2.toFixed(2),
      subtotalGaseosas: subtotalGrupo1.toFixed(2),
    });
  };

  return (
    <div className="container">
      <h1>División de Cuentas</h1>
      <h2>Gnc Full Paraná</h2>
      <hr />
      <div className="form">
        <label>
          Total de Ciclistas:
          <input
            type="number"
            value={totalPersonas}
            onChange={(e) => setTotalPersonas(Number(e.target.value))}
          />
        </label>
        <label>
          Toman cerveza y gaseosa:
          <input
            type="number"
            value={personasCervezaYGaseosa}
            onChange={(e) => setPersonasCervezaYGaseosa(Number(e.target.value))}
          />
        </label>
        <label>
          Solo toman gaseosa:
          <input
            type="number"
            value={personasSoloGaseosa}
            onChange={(e) => setPersonasSoloGaseosa(Number(e.target.value))}
          />
        </label>
        <label>
          Costo total de la comida (pesos):
          <input
            type="number"
            value={comida}
            onChange={(e) => setComida(Number(e.target.value))}
          />
        </label>
        <label>
          Costo de cada cerveza (pesos):
          <input
            type="number"
            value={cerveza}
            onChange={(e) => setCerveza(Number(e.target.value))}
          />
        </label>
        <label>
          Número de cervezas:
          <input
            type="number"
            value={numCervezas}
            onChange={(e) => setNumCervezas(Number(e.target.value))}
          />
        </label>
        <label>
          Costo de cada gaseosa (pesos):
          <input
            type="number"
            value={gaseosa}
            onChange={(e) => setGaseosa(Number(e.target.value))}
          />
        </label>
        <label>
          Número de gaseosas:
          <input
            type="number"
            value={numGaseosas}
            onChange={(e) => setNumGaseosas(Number(e.target.value))}
          />
        </label>
        <button onClick={calcular}>Calcular</button>
      </div>
      {resultados && (
        <div className="result">
          <h3>Resultados:</h3>
          <p>Total a Pagar: {resultados.cuentaTotal} pesos</p>
          <p>
            Cada una de las {personasSoloGaseosa} personas que solo toman
            gaseosa debe pagar: {resultados.grupo1} pesos.
          </p>
          <p>
            Cada una de las {personasCervezaYGaseosa} personas que toman cerveza
            y gaseosa debe pagar: {resultados.grupo2} pesos.
          </p>
          <p>Subtotal Cerveceros: {resultados.subtotalCerveceros} pesos</p>
          <p>Subtotal Gaseosas: {resultados.subtotalGaseosas} pesos</p>
        </div>
      )}
    </div>
  );
}

export default App;
