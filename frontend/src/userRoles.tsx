import { AbilityBuilder, Ability, defineAbility } from '@casl/ability'
import * as op from 'object-path'

export const userDomains = {
  faturamento: {},
  vendas: {},
  estoques: {},
  producao:{},
}
for (let k in userDomains) op.set(userDomains, k, k)

// levels:
// 0: proibido/invisível
// 1: visível
// 2: acesso restrito
// 3: acesso normal
// 4: acesso administrativo
// 5: acesso total
export const levels = ['l0', 'l1', 'l2', 'l3', 'l4', 'l5']

export const userRoles = {
  // apenas desenvolvedor
  dev: ((ud) => {
    let r = {}
    for (let k in ud) op.set(r, k, 5)
    return r
  })(userDomains),

  //
  diretor: {
    faturamento: 0,
    vendas: 0,
    estoques: 0,
  },

  //
  estoquista: {
    faturamento: 0,
    vendas: 0,
    estoques: 0,
  },

  //
  comprador: {
    faturamento: 0,
    vendas: 0,
    estoques: 0,
  },

  //
  vendedor: {
    faturamento: 0,
    vendas: 0,
    estoques: 0,
  },

  //
  supervisor: {
    faturamento: 0,
    vendas: 0,
    estoques: 0,
  },

  //
  default: {
    faturamento: 0,
    vendas: 0,
    estoques: 0,
  },
}

const defineAbility_ = (role: string) =>
  defineAbility((can) => {
    const r = op.get(userRoles, role, {})
    for (let k in r) {
      for (let i = 0; i <= op.get(r, k, 0); i++) {
        can(`l${i}`, k)
        // console.log({ i, k, role })
      }
      // console.log({ k, role })
    }
  })

export default defineAbility_
