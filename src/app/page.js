'use client'

import { useState } from "react";
import styles from "./page.module.css";



export default function Home() {
  const [state, setState] = useState(initialValues)
  const [calories, setCalories] = useState(0)

  const handleChange = (e) => {
    const { name, value} = e.target

    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let { age, height, systemHeight, weight, systemWeight } = e.target
    let heightInInch = height.value
    let weightInPound = weight.value
    let factor = 1
    if (age.value < 0 || height.value < 0 || weight.value < 0) alert("No se pueden ingresar numeros negativos")
    if (systemHeight.value === 'cm') heightInInch = height.value * 0.393701
    if (systemWeight.value === 'kg') weightInPound = weight.value * 2.20462
    if (weightInPound < 89.28722 || weightInPound > 661.387) alert("El peso debe estar entre 40.5Kg y 300Kg")
    if (heightInInch < 55.1181 || heightInInch > 88.5827) alert("La altura debe estar entre 1.4m (140cm) y 2.25m (225cm)")
    if (weightInPound < 165) factor = 1.6
    if (weightInPound >= 165 && weightInPound <= 200) factor = 1.4
    if (weightInPound > 200 && weightInPound <= 220) factor = 1.2

    let result = (((10 * weightInPound) + (6.25 * heightInInch) + ((10 * age.value) + 5)) * factor).toFixed(2)
    setCalories(result)

  }

  return (
    <main className={styles.main}>
      <h2>Te mostramos la cantidad de calorias que debes consumir en un dia.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="age">Ingresa tu Edad:</label>
        <input id="age" name="age" type="number" min="16" max="105" value={state.age} onChange={handleChange}/>
        <label htmlFor="height">Ingresa tu altura:</label>
        <input id="height" name="height" type="number" value={state.height} onChange={handleChange}/>
        <select id="systemHeight" name="systemHeight" defaultValue="in" onChange={handleChange}>
          <option value="in">in</option>
          <option value="cm">cm</option>
        </select>
        <label htmlFor="weight">Ingresa tu peso:</label>
        <input id="weight" name="weight" type="number" value={state.weight} onChange={handleChange}/>
        <select id="systemWeight" name="systemWeight" defaultValue="lb" onChange={handleChange}>
          <option value="lb">lb</option>
          <option value="kg">Kg</option>
        </select>
        <button
          type="submit"
          disabled={state.age === '' || state.height === ''}
        >
          Calcular
        </button>
      </form>
      <h2>Las calorias que debes consumir en un dia son:</h2>
      <p>{calories} cal</p>
    </main>
  );
}

const initialValues = {
  age: "",
  height: "",
  weight: "",
  systemWeight: "",
  systemHeight: "",
}

