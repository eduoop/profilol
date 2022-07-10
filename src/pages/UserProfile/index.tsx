import styles from './styles.module.css'
import { UsersSearch } from '../../types/UsersSearch'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../config/api'
import { toast } from 'react-toastify'
import {BsPersonCircle} from 'react-icons/bs'
import {IoIosRocket} from 'react-icons/io'
import {RiCloseCircleFill} from 'react-icons/ri'
import { Champeon } from '../../types/Champion'
import axios from 'axios'


export const UserProfile = () => {
  
  const apikey  = import.meta.env.VITE_API_KEY;
  const [user, setUser] = useState<UsersSearch>()
  const [champions, setUChampions] = useState<Champeon[]>()
  let bestChamps: {[Key:number]: string}[]
  const {username} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/lol/summoner/v4/summoners/by-name/${username}?${apikey}`)
    .then((res) => {
      setUser(res.data)
    })
    .catch((err) => {toast('ops, algo deu errado!')})
  }, [])

  // GET BEST CHAMPIONs IDS

  useEffect(() => {
    if(user) {
        api.get(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${user.id}?${apikey}`)
        .then((res) => {
          setUChampions(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  // GET CHAMPIONS NAMES

  const getChampion = (id: number) => {
    axios.get(`http://ddragon.leagueoflegends.com/cdn/12.12.1/data/de_DE/champion.json`)
    .then((res) => {
      for (var i in res.data.data) {
        if (res.data.data[i].key == id) {
          bestChamps.push(res.data.data[i].id)
        }
      }
    })
  }

  useEffect(() => {
    if(champions) {
      champions.map((champ) => {
        getChampion(champ.championId) 
      })
    }
  },[champions])

  useEffect(() => {
    if(bestChamps) {
     console.log(bestChamps.0)
    }
  }, [bestChamps!])

  return (
    <div className={styles.container}>
      <RiCloseCircleFill className={styles.close} onClick={() => navigate("/")}/>
      <div className={styles.paper}>
        <div className={styles.profile_infos_header}>
          <div className={styles.profile_infos}>
            <div className={styles.image_container}>
              <img src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/${user?.profileIconId}.png`}/>
            </div>
            <div className={styles.profile_user_infos}>
              <h1><BsPersonCircle/> {user?.name}</h1>
              <h1><IoIosRocket/>{user?.summonerLevel}</h1>
            </div>
          </div>
          <div className={styles.preofile_champs}></div>
        </div>

        <div className={styles.best_champeons}>
          
        </div>
      </div>
    </div>
  )
}
