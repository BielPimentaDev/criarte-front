import {
  Calendar,
  CaretLeft,
  CaretRight,
  DownloadSimple,
  LinkedinLogo,
} from "phosphor-react";
import { CurrentCalendar } from "./CurrentCalendar";
import { Header } from "./Header";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { monthsTranslate, translateDictionary } from "./DataConvert";
import AppContext from "../context/AppContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from "react-loader-spinner";
import nameLogo from "../imgs/nameLogo.jpg";
import "./mainStyle.css";
import { ExportToExcel } from "./ExportToExcel";

export function Main() {
  const [months, setMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { monthsShow, setMonthsShow } = useContext(AppContext);
  const { data, setData } = useContext(AppContext);
  const url = ` https://thayxis.herokuapp.com/api/v1/products`;
  const callApi = async () => {
    const results = await axios.get(url);
    return results;
  };

  async function fetchData() {
    const results = await callApi();
    console.log(results.data);

    const jsonData = Object.entries(results.data);
    setData(results.data);

    setMonths(jsonData);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="divLoading">
          <img src={nameLogo} className="logoName" />
          <ThreeDots
            height="100"
            width="100"
            color="#A1D1FF"
            ariaLabel="Carregando..."
          />
        </div>
      ) : (
        <>
          <Header />

          <section className="flex justify-center m-10 sm:justify-end  ">            
            
          <ExportToExcel apiData={Object.values(data)} fileName="teste"/>
          </section>


          <section className="flex justify-center  ">
            <button
              onClick={() =>
                setMonthsShow(monthsShow > 0 ? monthsShow - 1 : monthsShow)
              }
            >
              <CaretLeft size={32} weight="fill" />
            </button>
            <span className="font-bold text-lg ">
              {monthsTranslate(months[monthsShow][0].slice(5, 7)) +
                " - " +
                months[monthsShow][0].slice(0, 4)}
            </span>
            <button
              onClick={() =>
                setMonthsShow(
                  monthsShow >= months.length - 1 ? monthsShow : monthsShow + 1
                )
              }
            >
              <CaretRight size={32} weight="fill" />
            </button>
          </section>

          <CurrentCalendar
            months={Object.entries(months[monthsShow][1])}
            month={months[monthsShow][0]}
          />
        </>
      )}
    </>
  );
}
