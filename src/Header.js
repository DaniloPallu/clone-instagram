import { auth, storage, db } from "./firebase.js";
import firebase from "firebase/compat/app";

import { useEffect, useState } from "react";

function Header(props) {
  const [progress, setProgress] = useState(0);

  const [file, setFile] = useState(null);

  useEffect(() => {}, []);

  function criarConta(e) {
    e.preventDefault();

    let email = document.getElementById("email-cadastro").value;
    let username = document.getElementById("username-cadastro").value;
    let senha = document.getElementById("senha-cadastro").value;

    //Criar conta FIREBASE.

    auth
      .createUserWithEmailAndPassword(email, senha)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });

        alert("Conta Criada com sucesso!");
        let modal = document.querySelector(".modalCriarConta");
        modal.style.display = "none";
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function logar(e) {
    e.preventDefault();
    let email = document.getElementById("email-login").value;
    let senha = document.getElementById("senha-login").value;

    auth
      .signInWithEmailAndPassword(email, senha)
      .then((auth) => {
        props.setUser(auth.user.displayName);
        alert("Logado com sucesso");
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function abrirModalCriarConta(e) {
    e.preventDefault();

    let modal = document.querySelector(".modalCriarConta");

    modal.style.display = "block";
  }

  function abrirModalUpload(e) {
    e.preventDefault();
    let modal = document.querySelector(".modalUpload");

    modal.style.display = "block";
  }

  function fecharModalCriar() {
    let modal = document.querySelector(".modalCriarConta");

    modal.style.display = "none";
  }

  function fecharModalUpload() {
    let modal = document.querySelector(".modalUpload");

    modal.style.display = "none";
  }

  function deslogar(e) {
    e.preventDefault();
    auth.signOut().then(function (val) {
      // props.setUser(null);
      window.location.href = "/";
    });
  }

  function uploadPost(e) {
    e.preventDefault();
    let descricaoPost = document.getElementById("descricao-upload").value;
    let progressEl = document.getElementById("progress-upload").value;

    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      function (error) {},
      function () {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(function (url) {
            db.collection("posts").add({
              titulo: descricaoPost,
              image: url,
              userName: props.user,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setFile(null);
            alert("Upload Realizado com sucesso");

            document.getElementById("form-upload").reset();
          });
      }
    );
  }

  return (
    <div className="header">
      <div className="modalCriarConta">
        <div className="formCriarConta">
          <div onClick={() => fecharModalCriar()} className="close-modal-criar">
            {" "}
            X{" "}
          </div>
          <h2>Criar conta</h2>
          <form onSubmit={(e) => criarConta(e)}>
            <input
              id="email-cadastro"
              type="text"
              placeholder="Insira seu e-mail"
            />
            <input
              id="username-cadastro"
              type="text"
              placeholder="Insira seu username"
            />
            <input
              id="senha-cadastro"
              type="password"
              placeholder="Insira sua senha"
            />
            <input type="submit" value="Nova conta!" />
          </form>
        </div>
      </div>

      <div className="modalUpload">
        <div className="formUpload">
          <div
            onClick={() => fecharModalUpload()}
            className="close-modal-criar"
          >
            {" "}
            X{" "}
          </div>
          <h2>Fazer Upload</h2>
          <form id="form-upload" onSubmit={(e) => uploadPost(e)}>
            <progress id="progress-upload" value={progress}></progress>
            <input
              id="descricao-upload"
              type="text"
              placeholder="Descricao da foto"
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="file"
            />
            <input type="submit" value="Novo post!" />
          </form>
        </div>
      </div>

      <div className="center">
        <div className="header_logo">
          <a href="">
            {" "}
            <img src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />{" "}
          </a>
        </div>
        {props.user ? (
          <div className="header_logadoInfo">
            <span>
              {" "}
              Olá, <b>{props.user}</b>
            </span>
            <a onClick={(e) => abrirModalUpload(e)} href="#">
              Postar
            </a>
            <a onClick={(e) => deslogar(e)}> Deslogar </a>
          </div>
        ) : (
          <div className="header_loginForm">
            <form onSubmit={(e) => logar(e)}>
              <input id="email-login" type="text" placeholder="login" />
              <input id="senha-login" type="password" placeholder="senha" />
              <input type="submit" placeholder="logar" />
            </form>
            <div className="btn_criarconta">
              <a onClick={(e) => abrirModalCriarConta(e)} href="#">
                Criar conta
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
