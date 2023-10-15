import "object-path";
import * as op from "object-path";
import * as im from "object-path-immutable";
import reduceReducers from "reduce-reducers";
import { put, select, takeEvery } from 'redux-saga/effects';
import { rh, rt } from "../../agent";
import { at, mod } from "./modconf";

export const apiActs = {
    operationsA: (p) => {
        let q = rt(rh("get", `/omieIntegra/v1/produtosB/operationsA`)
            .query(p.filtro || {}));
        return q;
    },
};

export const operationsACommon = (state = {}, action) => {
    switch (action.type) {
        default:
            return null;
    }
};

export const defaultState = (() => {
    let ds = {
        filtro: {
            pedido: 0,
            processo: 1,
            concluido: 0,
        },
        dirty: '',
    };
    return ds;
})();

const toSetTraps = ({ state, action }) => {
    let filtro = op.get(action.toSet, 'filtro');
    // let txt = op.get(action.toSet, 'txt');
    if (filtro) {
        state = im.set(state, 'dirty', true);
    }
    //
    return im.merge(state, '', op.get(action, 'toSet', {}));
};

const filtraPedidoFull = ({ lista, campos }) => {
    return lista;
};

const reducerBase = (state = defaultState, action) => {
    // if (action.type.mod === mod)
    switch (action.type) {
        // --------------------
        case at.SetState:
            return toSetTraps({ state, action });
        // --------------------
        case at.LoadData:
            let paid = action.payload || {};
            let produtosBFull = filtraPedidoFull({ lista: paid.data || [] });

            return {
                ...state,
                produtosBFull
            };
        default:
            return state;
    }
    return state;
};

// Careerga DS espcífica, via lista de URLs
function* getDataSource(action) {
    let filter = yield select(s => s[mod].filtro);
    yield put({
        type: at.LoadData,
        payload: apiActs.operationsA({ filtro: { ...filter } })
    });
}

export const sagas = [
    (function* () {
        yield takeEvery(at.getDataSource, getDataSource);
    })(),
];

export const operationsA = reduceReducers(
    defaultState,
    (state = defaultState, action) => {
        let stt = reducerBase(state, action);
        return stt;
    }

);
const modulo = { sagas, reducer: operationsA, commonReducer: operationsACommon };
export default modulo;