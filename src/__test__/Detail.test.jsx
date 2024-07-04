import { render, screen } from "@testing-library/react";
import Detail from "../pages/Detail/index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { exa_data } from "../constants";
import { act } from 'react';


//Test ortamındaki sahte store'nin kurulumu.
const mockStore = configureStore([thunk]);

it("Yükleme durumunda loader bileşenleri ekrana basılır.", () => {
    //Yükleme durumundaki store'yi simüle et.
    const store = mockStore({ isLoading: true, error: null, data: null });

    render(
        <BrowserRouter>
            <Provider store={store}>
                <Detail />
            </Provider>
        </BrowserRouter>
    );
    //Loader bileşeninin ekrana basıldığını test et.
    screen.getByTestId("header-loader")
    screen.getAllByTestId("card-loader")

});

it("Hata gelme durumunda error bileşeni ekrana basılır.", () => {
    const store = mockStore({
        isLoading: false,
        error: "404 content not found",
        data: null,
    });
    render(

        <Provider store={store}>
            <BrowserRouter>
                <Detail />
            </BrowserRouter>
        </Provider >

    );
    //Hata metnini içeren element ekrana basıldı mı?
    screen.getByText(/404 content/i);
});

it("Veri gelme durumunda ülke bilgisi ve kartlar ekrana basılır.", () => {

    //Veri gelme durumunda store simüle et.
    const store = mockStore({
        isLoading: false,
        error: null,
        data: exa_data,
    });
    render(

        <Provider store={store}>
            <BrowserRouter>
                <Detail />
            </BrowserRouter>
        </Provider >

    );
    // 1) Ülke detayları ekrana geliyor mu?

    // Ülke ismi ekrana geliyor mu?
    screen.getByText("Turkiye");

    // Ekrandaki resmi al.
    const img = screen.getByRole("img");

    // Resmin kaynağı doğru mu?
    expect(img).toHaveProperty("src", exa_data.country.flags.png);

    // 2) Kartlar ekrana geliyor mu?

    // Covid nesnesini diziye çevir.
    const arr = Object.entries(exa_data.covid);

    // Dizideki bütün elemanların key ve value değerleri ekrana basılıyor mu?
    arr.forEach((item) => {
        // Başlık ekrana geldi mi?
        screen.getByText(item[0].split("_").join(" "));

        // Değer ekrana geldi mi?
        screen.getAllByText(item[1]);
    });


});