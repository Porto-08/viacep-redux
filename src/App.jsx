import React, { useState } from "react";
import style from "./home.module.scss";
import directions from "./assets/svg/directions.svg";
import successs from "./assets/svg/success.svg";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCep, resetData } from "./store/cep";
import { ToastContainer, toast } from "react-toastify";
import { HiArrowNarrowLeft } from "react-icons/hi";

const App = () => {
  const [inputCep, setInputCep] = useState("");
  const validadeCep = /^[0-9]{8}$/;

  const { loading, data, error } = useSelector((state) => state.cep);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const cep = inputCep.replace(/\D/g, "");

    if (cep !== "" && validadeCep.test(cep)) {
      dispatch(fetchCep(cep.replace(/\D/g, "")));
    } else {
      toast("CEP inválido, preencha corretamente.", {
        theme: "dark",
        icon: "⚠️",
      });
    }
  };

  if (error) {
    toast("Erro ao buscar os dados, tente novamente mais tarde.", {
      theme: "dark",
      icon: "⚠️",
    });

    dispatch(resetData());
  }

  if (data !== null && data.erro !== true) {
    return (
      <div className={style.container}>
        <div className={`${style.content} ${style.fadeInUp}`}>
          <div className={style.address}>
            <h1>Aqui está seu endereço: </h1>
            <ul>
              <li>Cep: {data?.cep}</li>
              <li>Logradouro: {data?.logradouro}</li>
              <li>Complemento: {data?.complemento || "Nenhum"}</li>
              <li>Bairro: {data?.bairro}</li>
              <li>UF: {data?.uf}</li>
              <li>DDD: {data.ddd}</li>
            </ul>

            <button
              className={style.backToHome}
              onClick={() => dispatch(resetData())}
            >
              <HiArrowNarrowLeft size={20} className={style.backHome} />
              Voltar
            </button>
          </div>

          <img src={successs} alt="Success" className={style.image} />
        </div>
      </div>
    );
  } else if (data !== null && data.erro === true) {
    toast("Cep não encontrado.", {
      theme: "dark",
      icon: "⚠️",
    });

    dispatch(resetData());
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={`${style.container}`}>
        <div className={`${style.boxContainer} ${style.fadeInUp}`}>
          <img src={directions} alt="Directions" className={style.image} />

          <div className={style.form}>
            <label htmlFor="cep">Infome um CEP para consulta</label>
            <input
              type="text"
              id="cep"
              onChange={({ target }) => setInputCep(target.value)}
            />
            <button type="submit">
              {loading !== false && <ClipLoader size={20} color="#fff" />}
              Buscar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default App;
