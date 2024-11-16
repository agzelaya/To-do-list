import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import React, {useState, useEffect} from "react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const customStyle: React.CSSProperties = {
    backgroundColor: '#594f82',
    color: '#fff',
    borderRadius: '8px',
    padding: '10px 20px',
    marginTop: '10px'
  };

  const inputStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
  };


  const [tarea, setTarea] = useState<string>(''); 
  const [listaTareas, setListaTareas] = useState<{ tarea: string; completed: boolean }[]>([]); 

  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      setListaTareas(JSON.parse(tareasGuardadas)); 
    }
  }, []);

  const cambioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarea(e.target.value);
  };

  const crearTarea = () => {
    if (tarea.trim()) {
      setListaTareas([...listaTareas, { tarea, completed: false }]); 
      setTarea(''); 
    }
  };


  const tareaCompletada = (index: number) => {
    const updatedTareas = listaTareas.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setListaTareas(updatedTareas); 
  };

  const eliminarTodos = () => {
    setListaTareas([]);
  };

  const eliminarCompletados = () => {
    const updatedTareas = listaTareas.filter(task => task.completed !== true);
    setListaTareas(updatedTareas); 
  };

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(listaTareas)); 
  }, [listaTareas]);


  return (
    <>
      <Head>
        <title>Lista de quehaceres</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="container col-12 col-md-4 mb-3 " style={customStyle}>
        <h1>Lista de quehaceres</h1>
        <div className="container" style={inputStyle}>
          {/* Bind the input value to the state */}
          <input
            type="text"
            className="form-control"
            id="inputCrearTarea"
            placeholder="Tarea"
            value={tarea} 
            onChange={cambioInput} 
          />
          <button type="button" className="btn btn-primary" onClick={crearTarea}>
            Crear nuevo
          </button>
        </div>


        <div className="mt-3">
        {listaTareas.map((task, index) => (
          <div key={index} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`checkbox-${index}`}
              checked={task.completed} 
              onChange={() => tareaCompletada(index)} 
            />
            <label className="form-check-label" htmlFor={`checkbox-${index}`}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.tarea}
              </span>
            </label>
          </div>
        ))}
      </div>


        <div className="container" style={inputStyle}>
          <button type="button" className="btn btn-primary" onClick={eliminarTodos}>
            Eliminar todo
          </button>
          <button type="button" className="btn btn-primary" onClick={eliminarCompletados}>
            Eliminar completados
          </button>

        </div>

      </div>

      
    </>
  );
}
