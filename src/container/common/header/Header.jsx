import React from 'react'
import s from './header.module.scss'
import logo from '../../../asset/logo=dark.svg'

export default function Header() {
  return (
    <div>
      <div>
        <img src={logo} alt="" />
      </div>
    </div>
  )
}
