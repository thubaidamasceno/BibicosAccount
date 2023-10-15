class cng {
  constructor(p) {
    this.cni = 0
    this.fst = 1
    this.cnd = 0
    this.cnm = p.cnm
    this.cnp = p.cnp
  }

  cng_({ cnp, cnm, cnn }) {
    return `${cnp} ${cnm}-${cnn}`
  }

  n() {
    if (this.fst) {
      this.cnd = this.cnd + 10
      this.cni = 0
      this.fst = 0
    }
    return this.cng_({ cnn: this.cni + this.cnd, cnp: this.cnp, cnm: this.cnm })
  }

  i() {
    this.fst = 1
    this.cni = this.cni + 1
    return this.cng_({ cnn: this.cni + this.cnd, cnp: this.cnp, cnm: this.cnm })
  }

  d() {
    this.fst = 1
    this.cnd = this.cnd + 10
    this.cni = 0
    return this.cng_({ cnn: this.cni + this.cnd, cnp: this.cnp, cnm: this.cnm })
  }
}

export default cng
