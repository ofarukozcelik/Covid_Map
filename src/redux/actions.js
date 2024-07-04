import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const covidUrl = "https://covid-19-statistics.p.rapidapi.com/reports";
const headers = {
  "x-rapidapi-key": "d056082667msh5d48826fbae7be4p1fe68fjsn9015ad8ca90c",
  "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
};

const getData = createAsyncThunk("covid/getData", async ({ code, query }) => {
  const params = { iso: code, q: query };

  //isoCode'a göre covid verilerini al.
  const req1 = axios.get(covidUrl, { params, headers });

  //isoCode'a göre ülke verilerini al.
  const req2 = axios.get(
    code
    ? `https://restcountries.com/v3.1/alpha/${code}`
    : `https://restcountries.com/v3.1/name/${query}`
  );

  //Her iki isteği de aynı anda atıyoruz.
  const responses = await Promise.all([req1, req2]);

  //Api'dan gelen region nesnesindeki değerleri bir üst nesne ile aynı düzeye getirdik.
  const covid = {
    ...responses[0].data.data[0],
    ...responses[0].data.data[0].region,
  };

  //Gereksiz değerleri kaldırdık.
  delete covid.cities;
  delete covid.region;

  return { covid, country: responses[1].data[0] };
});

export default getData;
