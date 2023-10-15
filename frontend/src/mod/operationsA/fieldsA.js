// pt - nome da propriedade em portugues
// g - se propriedade pod ser exibida no grid
// n - se numérico


// export const ValueFormatters ={
//     n
// };
const etapas = {
    // 'Em Processo': 'Pro',
    // 'Concluido': 'Con',
    // 'Pedido': 'Ped',
    // 'Proposta': 'Orc',
    // 'Faturado': 'Fat',
    // 'Finalizado':'F',
}

const fields = {

    // "ped.etapaNome": { g: 1, pt: 'Etapa', n: 0, txt: 1, set: 1, agg: 'same' },
    // "seq": { g: 1, pt: 'Seq.', n: 0, int: 1, editable: 1 },
    // "ped_": { g: 1, pt: 'Ped/E', n: 0, txt: 1, set: 1 },
    // "item": { g: 1, pt: 'Item', n: 0, txt: 1, set: 1 },

    // // "ped.pedido": { g: 1, pt: 'Ped.', int: 1, txt: 0 },
    // // "ped.local": { g: 1, pt: 'E', n: 0, txt: 1 ,set:1},
    // "ped.clienteNome": { g: 1, pt: 'Cliente', n: 0, txt: 1, agg: 'same' },
    // "det.codigo": {
    //     f: 'det.codigo', pt: 'Código', g: 1, int: 0, unid: '', //type: 'xxx', cellRenderer: "agGroupCellRenderer" 
    // },
    // "codpcp": { g: 1, pt: 'Tela', n: 0, txt: 1, set: 1 },
    // "tipo": { g: 1, pt: 'Tipo', n: 0, txt: 1, set: 1 },
    // "malha": { g: 1, pt: 'Malha', n: 0, txt: 1, set: 1 },
    // "fio": { g: 1, pt: 'Fio', n: 0, txt: 1, set: 1 },
    // "cor": { g: 1, pt: 'Cor', n: 0, txt: 1, set: 1 },
    // "insumo": { g: 1, pt: 'Insumo', n: 0, txt: 1, set: 1 },
    // "det.quantidade": { pt: 'Qtd', g: 1, n: 1, unid: '', txt: 0, agg: 'sum' },
    // "det.peso": { pt: 'Σ Kg', g: 1, n: 1, unid: '', txt: 0, agg: 'sum' },
    // //
    // "ativacao": { g: 1, pt: 'De', n: 0,d:1,  txt: 1 },
    // "limitePrazo": { g: 1, pt: 'Para', n: 0, txt: 1 },
    // "frete": { g: 1, pt: 'Entrega', n: 0, txt: 1 },
    // //
    // "det.observacao": { pt: 'Obs', g: 1, n: 0, unid: '', txt: 1, large:1},
    // "det.valor_total": { pt: 'Σ R$', g: 1, n: 1, unid: '', txt: 0 },
    // "det.peso_un": { pt: 'Kg Un', g: 1, n: 1, unid: '', txt: 0 },
    // "ped.vendedor_alias": { g: 1, pt: 'Vend', n: 0, txt: 1 },
    // "ped.site": { g: 1, pt: 'Loja', n: 0, txt: 1 },
    // "ped.cfopx": { pt: 'CFOP', g: 1, n: 0, unid: '', txt: 1 },
    // "det.descricao": { pt: 'Descrição', g: 1, n: 0, unid: '', txt: 1, large:1 },
    // "det.inf_adic.dados_adicionais_item": {
    //     pt: 'Info NF', g: 1, n: 0,
    //     unid: '', txt: 1, large:1//cellEditor: 'agLargeTextCellEditor'
    // },
};
export default fields;
