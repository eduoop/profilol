import React, { useState } from 'react'
import styles from './styles.module.css'
import {SiRiotgames} from 'react-icons/si'
import { api } from '../../config/api'
import { UsersSearch } from '../../types/UsersSearch'
import { toast } from 'react-toastify'
import { UserProfile } from '../../components/UserProfile'
import yp from '../../assets/Daco_4398838.png'
import { useNavigate } from 'react-router-dom'

export const SearchAccont = () => {

    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState(false)
    const [user, setUser] = useState<UsersSearch>()
    const [userSearched, setuserSearched] = useState('')
    const apikey  = import.meta.env.VITE_API_KEY;

    console.log(apikey)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        setUser(undefined)
        e.preventDefault();
        setSearching(true)
        if(search.length === 0) {
            setSearching(false)
            toast.error('Preencha o campo', {
                hideProgressBar: true,
                pauseOnHover: false,
            })
            setuserSearched("")
            return false
        }
        api.get(`/lol/summoner/v4/summoners/by-name/${search}?${apikey}`)
        .then((res) => {
            setSearching(false)
            setUser(res.data)
            setuserSearched("")
            console.log(res.data)
        })
        .catch((err) => {
            setSearching(false)
            console.log(err)
            setuserSearched(search)
        })
    }


  return (
    <div className={styles.container}>
        <form onSubmit={(e) => submit(e)}>
            <input type="text" placeholder='Busque sua conta' onChange={(e) => setSearch(e.target.value)} value={search}/>
            { searching ?
                <button  disabled className={styles.waiting}><SiRiotgames/></button>
            :
                <button type="submit" className={styles.sub_btn}><SiRiotgames/></button>
            }
        </form>
        { user &&
            <div className={styles.user_profile}>
                <UserProfile user={user}/>
            </div>
        }
        { userSearched &&
            <div className={styles.user_not_find}>
                <p>Usuário <span>{userSearched}</span> não encontrado</p>
                <img src={yp} alt="" />
            </div>
        }
    </div>
  )
}
