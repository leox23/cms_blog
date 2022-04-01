import React, {useRef, useState, useEffect} from 'react'
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  //const [useStateMessage, setUseStateMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

    useEffect(() => {
      nameEl.current.value = window.localStorage.getItem('name');
      emailEl.current.value = window.localStorage.getItem('email');
    }, [])


  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

console.log("Datos qu agarro: Comentario:", comment, "Nombre: ",name,"Correo: ",email, "Almacenar(checked?): ",storeData )

    if(!comment || !name || !email){
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if(storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
        .then((res) => {
          setShowSuccessMessage(true);

          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Dejar un comentario</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100  text-gray-700"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-col-2 gap-4 mb-4">
        <input
          type="text" ref={nameEl}
          className="p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100  text-gray-700"
          placeholder="Name"
          name="name"      
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text" ref={emailEl}
          className="p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100  text-gray-700"
          placeholder="Email"
          name="email"      
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true"  />
          <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Guarda mi correo para la proxima ves que comente</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">Todos los campos son requeridos.</p>}
      <div className="mt-8">
          <button 
            type="button" 
            onClick={handleCommentSubmission}
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 cursor-pointer"
          >
            Enviar comentario
          </button>
          {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comentario enviado para su revision</span>}
      </div>
    </div>
  )
}

export default CommentsForm