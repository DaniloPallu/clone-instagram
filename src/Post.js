import {db} from "./firebase.js";
import { useEffect, useState } from "react";
import App from "./App.js";



function Post(props){

  const  [comentarios, setComentarios] = useState(null);

  useEffect(() => {
    db.collection('posts').doc(props.id).collection('comentarios').onSnapshot(function(snapshot){
        setComentarios(snapshot.docs.map(function (document) {
            return{ id: document.id, info: document.data() };
          }))
      })
  }, []);


    function comentar(id, e){
        e.preventDefault();

     let comentarioAtual = document.querySelector('#comentario-'+id).value;
      
      
        db.collection('posts').doc(id).collection('comentarios').add({
          nome:props.user,
          comentario:comentarioAtual
        })

        alert('COMENTADO');
          

      }


    return(

        <div className="postSingle">
            <img src={props.info.image}/>
            <p><b>{props.info.userName}</b>:{props.info.titulo}</p>


      <div className="coments">{
          comentarios.map(function(val){
            return (
              <div>comentario</div>
            )
          })
        }
          
        </div>


        <form onSubmit={(e)=>comentar(props.id,e)}>
              <textarea id = {"comentario-"+props.id}></textarea>
              <input type="submit" value="comentar!"/>
            </form>
            </div>



    )



}

export default Post;