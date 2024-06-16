import { useState } from "react";
import "./App.css";
import CssDoodle from "./components/CssDoodle.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newtodo, setTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [checked,setChecked] = useState([]);
  const addTodo = () => {
    if (newtodo !== "") {
      if(editingIndex !== null){
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? newtodo : task
        );
        setTasks(updatedTasks); 
        setEditingIndex(null);
      } else{
        setTasks([...tasks, newtodo]);
      }
      setTodo("");
    }
  };

  const edit = (index) => {
    setEditingIndex(index);
    console.log("working");
    setTodo(tasks[index]);
  };

  const handledelete = (index) => {
    if(checked.includes(index)){
      setChecked(checked.filter((i)=>(i != index)));
    }
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleCheck = (index)=>{
    if(checked.includes(index)){
      setChecked(checked.filter((i)=>(i != index)));
    } else{
      setChecked([...checked,index]);
    }
  };

  return (
    <div className=" min-h-screen text-white flex flex-col justify-center items-center gap-10">
      <CssDoodle />
      <div className="m-5 container bg-gray-900 max-w-lg w-full p-2  text-beige rounded-xl">
        <div className="bg-black p-2 rounded-xl">
          <h1 className="text-4xl  font-bold flex justify-center">
            <span className=" rounded-xl p-5 px-20 underline">TO-DO LIST</span>
          </h1>
          <div className="flex flex-col  m-5 gap-10">
            <textarea
              value={newtodo}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              placeholder="New task goes here..."
              className=" w-full text-black h-20 p-2"
            ></textarea>
            <button
              onClick={addTodo}
              className="bg-white text-black font-bold rounded-xl opacity-90  hover:font-extrabold  hover:bg-gray-500 hover:scale-105  h-10 transition ease-in-out delay-50 flex items-center justify-center"
            >
              <img
                src="https://cdn.hugeicons.com/icons/add-square-stroke-rounded.svg"
                alt="add-square"
                width="24"
                height="24"
              />
              {editingIndex !== null ? "Save Task" : "Add Task"}
            </button>
          </div>

          <div className="tasks bg-black rounded-xl p-3">
            <h2 className="text-3xl my-5  font-bold">Tasks:</h2>
            {tasks.length === 0 ? (
              <h1 className="bg-white opacity-90 text-black  p-2 rounded-xl">
                No Tasks Added Yet!
              </h1>
            ) : (
              tasks.map((item, index) => (
                <div
                  className="task flex justify-between align-middle my-4"
                  key={index}
                >
                  <input type="checkbox" className="scale-110 mx-3" checked={checked.includes(index)} onChange={()=>handleCheck(index)}/>
                  <h1 className ={ ` bg-white text-black font-medium p-2 rounded-lg grow break-all ${checked.includes(index)?"line-through":""}`}>
                    {item}
                  </h1>
                  <div className="buttons flex ">
                    <button
                      className="edit bg-gray-600  p-2 rounded-lg mx-2   hover:bg-white transition hover:scale-110 "
                      onClick={()=> edit(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#f09a0d"
                        fill="none"
                      >
                        <path
                          d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    <button
                      className="delete bg-gray-600 p-2 rounded-lg    hover:bg-white transition-all hover:scale-110"
                      onClick={()=>handledelete(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#f2100b"
                        fill="none"
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9.5 16.5L9.5 10.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M14.5 16.5L14.5 10.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="footer ">

      Copyright © 2024 Lokeshwar Kamuni
      </div>
    </div>
  );
}

export default App;
