import React from 'react'
import styles from './styles.module.css'
import {HiOutlinePlusSm} from 'react-icons/hi'

type Props = {
  setAddingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}


export const AddAccountButton = ({setAddingAccount}: Props) => {
  return (
    <div className={styles.add_account}>
      <button onClick={() => setAddingAccount(true)}><HiOutlinePlusSm/> Adicionar conta</button>
    </div>
  )
}
