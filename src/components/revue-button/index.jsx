import React from 'react'

import './index.scss'

export const RevueButton = ({ revueId }) => (
  <div className="revue-button">
    <a
      className="link"
      target="_blank"
      href={`https://www.getrevue.co/profile/${revueId}`}
    >
      <img src="/images/revue.png" alt="revue" />
      <span>立即订阅</span>
    </a>
  </div>
)
