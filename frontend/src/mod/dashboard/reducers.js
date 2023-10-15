import produce from "immer"
import reduceReducers from 'reduce-reducers';
import { rh, rt, SITE } from "../../agent";
import { act } from './modconf';
import * as op from 'object-path';
import * as im from 'object-path-immutable';
import { call, put, takeEvery, select } from 'redux-saga/effects'
import moment from "moment";

export const apiActs = {
    dashboard: p => {
        return rt(rh('get', `/omieIntegra/v1/dashboard`)
            .query(p.filtro));
    },
    get: p => {
        return rt(rh('get', p.url));
    },
};

export const dashboardCommon = (state = {}, action) => {
    switch (action.type) {
        case act.HP_WAITING:
            return { ...state };
        default:
            return null;
    }
};

export const defaultState = (() => {
    let ds = {
        data: [
            { x: "mes/ano", y: 0. , v:0.},
            { x: "mes/ano", y: 0. , v:0.},
            { x: "mes/ano", y: 0. , v:0.},
            { x: "mes/ano", y: 0. , v:0. },
            { x: "mes/ano", y: 0. , v:0.},
            { x: "mes/ano", y: 0. , v:0. },
            { x: "mes/ano", y: 0. , v:0. },
            { x: "mes/ano", y: 0. , v:0.},
            { x: "mes/ano", y: 0. , v:0. },
            { x: "mes/ano", y: 0. , v:0. },
            { x: "mes/ano", y: 0. , v:0.},
            { x: "mes/ano", y: 0. , v:0. },
        ]
    };
    return ds;
})();

// Careerga DS espcífica, via lista de URLs
function* getDataSource(action) {
    try {
        const RemoteData = yield call(apiActs.dashboard, { filtro: {} });
        if (RemoteData.ok) {
            let data = op.get(RemoteData, 'data', []).sort((a, b) => {
                let ai = 0, bi = 0;
                 ai = (op.get(a, 'ordem,', 0)) 
                 bi = (op.get(b, 'ordem', 0))
                return bi - ai;
            }).map(d => ({
                x: op.get(d, '_id.etapaNome', ''),
                y: op.get(d, 'count', 0),
                v: op.get(d, 'valor_total', 0),
            }))

            yield put({
                type: act.hpSetState,
                toSet: {
                    processing: false,
                    loaded: true,
                    data,
                }
            });
        }
        else {

        }
    }
    catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
        yield put({
            type: act.hpSetState,
            toSet: {
                processing: true,
                loaded: true,
                data: defaultState.data,
            }
        });
    }
}

// Careerga DS espcífica, via lista de URLs
function* HP_LOADED(action) {
    try {
        yield put({ type: act.hp.getDataSource });
    }
    catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
        yield put({
            type: act.hpSetState,
            toSet: {
                processing: false,
                data: defaultState.data
            }
        });
    }
}

function* StateTraps(action) {
    // let mesBase = op.get(action.toSet, 'mesBase')
    // if (mesBase) {
    //     yield put({
    //         type: act.hp.getDataSource,
    //     });
    // }
    yield true;
}

export const sagas = [
    (function* () {
        yield takeEvery(act.hpSetState, StateTraps);
    })(),
    (function* () {
        yield takeEvery(act.hp.getDataSource, getDataSource);
    })(),
    (function* () {
        yield takeEvery(act.load, HP_LOADED);
    })(),
];

const toSetTraps = ({ state, action }) => {

    return im.merge(state, '', op.get(action, 'toSet', {}));
};

const reducerBase = (state = defaultState, action) => {
    let v = {};
    switch (action.type) {
        // case   act.HP_LOADED:
        //     return {
        //         ...state,
        //         // data: db.get,
        //     };
        case act.hpSetState:
            return toSetTraps({ state, action });
        default:
            return state;
    }
};

const Reducers1 = produce((draft, action) => { }, defaultState);

export const dashboard = reduceReducers(defaultState,
    (state = defaultState, action) => {
        let stt = reducerBase(state, action);
        return stt;
    },
    Reducers1,
);
const reducers = { sagas, reducer: dashboard, commonReducer: dashboardCommon }
export default reducers;
