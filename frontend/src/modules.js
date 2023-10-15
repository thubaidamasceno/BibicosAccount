import produtosArameA from './mod/operationsA'
import dashboard from './mod/dashboard'

const prefix = ''
var red = {}
let rot = []
let sagas = [] //sagas
//rot = [...rot,(<Route path="/mapapp" component={()=>(<MyComponent/>)} />),];
let men = []
let hea = []
let rc = []
let sty = []

const mods = [
  produtosArameA,
  dashboard,
]

mods.forEach((f) => {
  red = { ...red, [f.mod]: f.red }
  rc = [...rc, f.rc]
  sagas = [...sagas, ...f.sagas]
  // rot = [...rot, ...f.rot]
  // men = [...men, ...f.men]
})


export const rootSagas = sagas
export const reducers = red
export const approutes = rot
export const menuitems = men
export const headers = hea
export const redcommon = rc

/*
Módulos a desenvolver:

    * Visão rápida de Estoque -> ver as 3 lojas
    * Requisição de Frete, Programação de Frete, Programação de Rota, Controle de Viagem

    * Ficha de portão e RM online
    * Controle de 'diáiras de obra' online

    * Visão Global de Requisições e Pedidos de Compra











 */
