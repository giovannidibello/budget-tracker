// importo il componente segnaposto della libreria di router
import { Outlet } from "react-router-dom";

// importo i componenti del layout
import Header from "../components/Header";


export default function DefaultLayout() {

    return (
        <>
            <Header />
            <Outlet />

        </>
    );
}