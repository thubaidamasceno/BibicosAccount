export const mod = 'operationsA'

var _at = {};
[
    'getDataSource'
].map(v => _at[v] = mod + v);

var _act = {
    SetState: '',
    LoadData: '',
};
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
// const act = _act;
export const at = { ..._at, ..._act };
