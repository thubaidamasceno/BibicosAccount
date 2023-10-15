import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="https://pcp14.aramita.damasceno.pro" target="_blank" rel="noopener noreferrer">
          PCP Aramita
        </a>
        <span className="ms-1">&copy; 2021 Aramita.</span> */}
      </div>
      <div className="ms-auto">
        <span className="me-1">Desenvolvido por Thubaí Damasceno</span>
        <a href="https://www.damasceno.pro" target="_blank" rel="noopener noreferrer">
          www.damasceno.pro
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
