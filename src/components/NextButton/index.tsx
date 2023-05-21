import { Button } from 'antd'
import React from 'react'

const buttonStyles: React.CSSProperties = {
    width: '194px',
    height: '32px',
    background: '#4FA1C1',
    borderRadius: '10px',
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 700,
}

function NextButton() {
  return (
    <Button style={buttonStyles}>Próximo passo</Button>
  )
}

export default NextButton