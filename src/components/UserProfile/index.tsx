import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { UsersSearch } from '../../types/UsersSearch'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Props = {
    user: UsersSearch | undefined
}

export const UserProfile = ({user}: Props) => {

    const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/profile/${user?.name}`)}>
        <div className={styles.image_container}>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/${user?.profileIconId}.png`}/>
        </div>
        <div className={styles.infos}>
            <h1>{user?.name}</h1>
        </div>
        <div className={styles.level}>
            <p>{user?.summonerLevel}</p>
        </div>
    </div>
  )
}
