import { Layout, Model, TabNode, IJsonModel } from 'flexlayout-react';
import './App.css';
import '../../assets/css/flexlayout-gray.css';
import { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as op from "object-path";
// import {apiActs} from "./reducers";

import { useParams } from 'react-router-dom'
import { act } from './modconf'

import Chart from './ChartJS';


function App() {
    // let { report } = useParams()
    const factory = (node: TabNode) => {
        var conf = node.getConfig();
        var component = node.getComponent();
        if (component === "chart") {
            return <Chart conf={conf} />;
        }
    };

    return (
        <div className="container lg">
        <div className="row">
            {/* <Layout
                model={model}
                factory={factory} /> */}
            <Chart
                conf={{}}
            /></div>
        </div>
    );
}

function AppB() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <App />
        </Suspense>
    )
}

export default App;