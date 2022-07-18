import React, { useState } from 'react'
import styles from './styles.module.css'
import {HiOutlinePlusSm} from 'react-icons/hi'
import {IoEyeOffOutline} from 'react-icons/io5'
import { toast } from 'react-toastify'
import { api } from '../../config/api'

type Props = {
  setAddingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}


export const AddAccount = ({setAddingAccount}: Props) => {

  const apikey  = import.meta.env.VITE_API_KEY;
  
  const [userName, setUserName] = useState('')
  const [disabled, setDisabled] = useState(false)
  
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true)
    e.preventDefault();
    if(!userName){
      toast.error('Preencha o campo', {
        hideProgressBar: true,
        pauseOnHover: false,
      })
      return false
    }

    api.get(`/lol/summoner/v4/summoners/by-name/${userName}?${apikey}`)
    .then((res) => {
      const user = res.data
        localStorage.setItem('loggedUser', JSON.stringify(user))
        console.log(res.data)
        setDisabled(false)
        setAddingAccount(false)
    })
    .catch((err) => {
      console.log(err)
      setDisabled(false)
      toast.error('Conta não encontrada')
    })
  }

  return (
    <div className={styles.card}>
        <form onSubmit={(e) => submit(e)}>
            <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder='Usuário'/>
            { disabled ?
              <button disabled className={styles.disabled}><HiOutlinePlusSm/></button>
            :
              <button type="submit" className={styles.abled}><HiOutlinePlusSm/></button>
          }
        </form>
        <button onClick={() => setAddingAccount(false)} className={styles.close}><IoEyeOffOutline/></button>
    </div>
  )
}
