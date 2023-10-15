// deve ser importado tanto pelo frontend quanto pelo backend
const g = {
    m: (m, f) => m,
    f: (m, f) => f,
};
const n = {
    s: (s, p) => s,
    p: (s, p) => p,
};
const c = {
    n: (n, c) => n,
    c: (n, c) => c,
    cam: (s) => s[0].toUpperCase() + s.substr(1),
    nor: (s) => s
};
//
const txt = {
    g, n, c,
    _: undefined,
    //
    _fmea: {gen: g.f},
    FMEA: (num = n.s, cas = c.n, gen = g.f) =>
        `FMEA${num('', 's')}`,
    //
    oa: (num = n.s, cas = c.n, gen = g.m) =>
        cas(c.nor, c.cam)(`${gen('o', 'a')}${num('', 's')}`)
};

//
var _act = {
    hpSetState: '',
    hp: {
        loadData: 0,
        loadDataSources: 0,
        getDataSource: 0,
        setProcessing:0,
        setPrintReady:0,
        unSetProcessing:0,
    },
    HP_ACT: {
        createDB: 0,
    },
    REDIRECT_TO: '',
    HP_UPDATEFIELD: '',
    HP_WAITING: '',
    HP_LOADED: '',
    HP_UNLOADED: '',
    HP_NODECHANGE: '',
    HP_NODECLICK: '',
    HP_ACT_FUNCS: '',
    load: 0,
};
export const mod =  'dashboard'

const singler = sstruct => {
    for (let k in sstruct)
        if (!sstruct[k])
            sstruct[k] = mod+k;
        else
            sstruct[k] = singler(sstruct[k]);
    return sstruct;
};
for (let k in _act)
    if (!_act[k])
        _act[k] = mod+k;
    else
        _act[k] = singler(_act[k]);
export const act = _act;
// module.exports = {txt, act,mod};