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
import {IoIosTrophy} from 'react-icons/io'
import { Champeon } from '../../types/Champion'
import { ChampeonFullInfos } from '../../types/Champion'
import { UserLeague } from '../../types/UserLeag'
import bronze from '../../assets/emblems/Emblem_Bronze.png'
import iron from '../../assets/emblems/Emblem_Iron.png'
import platinum from '../../assets/emblems/Emblem_Platinum.png'
import gold from '../../assets/emblems/Emblem_Gold.png'
import master from '../../assets/emblems/Emblem_Master.png'
import challenger from '../../assets/emblems/Emblem_Challenger.png'
import grandmaster from '../../assets/emblems/Emblem_Grandmaster.png'
import silver from '../../assets/emblems/Emblem_Silver.png'
import diamond from '../../assets/emblems/Emblem_Diamond.png'

import axios from 'axios'


export const UserProfile = () => {
  
  const apikey  = import.meta.env.VITE_API_KEY;

  
  const [user, setUser] = useState<UsersSearch>()
  const [champions, setUChampions] = useState<Champeon[]>()
  let arrBestChamps: any = [];
  const [bestChamps, setBestChamps] = useState(arrBestChamps)
  const [bestChampsFull, setBestChampsFull] = useState<ChampeonFullInfos>()
  const [principalLeag, setPrincipalLeag] = useState<UserLeague>()
  const [mouseEnterWinsInPrincipal, setMouseEnterWinsInPrincipal] = useState(false)
  const [mouseEnterLossesInPrincipal, setMouseEnterLossesInPrincipal] = useState(false)

  const [mouseEnterWinsInSecond, setMouseEnterWinsInSecond] = useState(false)
  const [mouseEnterLossesInSecond, setMouseEnterLossesInSecond] = useState(false)
  const [secondPrincipalLeag, setSecondPrincipalLeag] = useState<UserLeague>()
  const [winrate, setWinrate] = useState<String>()
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
          console.log(res.data)
          console.log(user.id)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  // GET CHAMPIONS NAMES

  const getChampion = (id: number) => {
    axios.get(`http://ddragon.leagueoflegends.com/cdn/12.12.1/data/pt_BR/champion.json`)
    .then((res) => {
      for (var i in res.data.data) {
        if (res.data.data[i].key == id) {
          const iteration = res.data.data[i].id
          setBestChamps((arrBestChamps: any) => [...arrBestChamps, iteration])
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

    // get best champ

    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const setBestChamp = () => {
      if(bestChamps) {
        bestChamps.map((champ: string) => {
          axios.get(`http://ddragon.leagueoflegends.com/cdn/12.13.1/data/pt_BR/champion/${capitalizeFirstLetter(champ)}.json`)
          .then((res) => {
            console.log(res.data.data.champ)
            console.log(champ)
          })
        })
      }
    }

    useEffect(() => {
      if(bestChamps) {
        setBestChamp()
      }
    }, [bestChamps])

  // get user league

  const getLeague = () => {
    api.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${user?.id}?${apikey}`)
    .then((res) => {
      setPrincipalLeag(res.data[0])
      setSecondPrincipalLeag(res.data[1])
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(user?.id) {
      getLeague()
    }
  }, [user])

  // calc winrate 

  useEffect(() => {
    if(principalLeag) {
      const winrate = (principalLeag.wins/(principalLeag.wins + principalLeag.losses) * 100).toFixed(1)
      setWinrate(winrate)
    }
  }, [principalLeag])

  useEffect(() => {
    if(winrate) {
     console.log(winrate)
    }
  }, [winrate])

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

        <div className={styles.user_infos_container}>
          <div className={styles.leagues_container}>
            {principalLeag?.tier &&
              <div>
                <div className={styles.rank_img_container}>
                  <h1>Solo/Duo</h1>
                  {principalLeag?.tier.toLowerCase() === 'bronze' && 
                    <img src={bronze}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'iron' && 
                    <img src={iron}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'gold' && 
                    <img src={gold}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'master' && 
                    <img src={master}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'challenger' && 
                    <img src={challenger}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'grandmaster' && 
                    <img src={grandmaster}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'silver' && 
                    <img src={silver}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'diamond' && 
                    <img src={diamond}/>
                  }
                  {principalLeag?.tier.toLowerCase() === 'platinum' && 
                    <img src={platinum}/>
                  }
                  <div className={styles.wins_and_loses}>
                    <h2 className={styles.wins} onMouseEnter={() => setMouseEnterWinsInPrincipal(true)} onMouseLeave={() => setMouseEnterWinsInPrincipal(false)}>{principalLeag.wins}</h2>
                    <h2 className={styles.losses} onMouseEnter={() => setMouseEnterLossesInPrincipal(true)} onMouseLeave={() => setMouseEnterLossesInPrincipal(false)}>{principalLeag.losses}</h2>
                    <span className={mouseEnterWinsInPrincipal ? `${styles.wins_enter} ${styles.opacity}` : `${styles.wins_enter}`}>{principalLeag.wins} Vitórias</span>
                    <span className={mouseEnterLossesInPrincipal ? `${styles.loses_enter} ${styles.opacity}` : `${styles.loses_enter}`}>{principalLeag.losses} Derrotas</span>
                  </div>
                </div>
              </div>
            }

            {/* Second league */}

            {secondPrincipalLeag?.tier &&
              <div>
                <div className={styles.rank_img_container}>
                  <h1>Flex</h1>
                  {secondPrincipalLeag?.tier.toLowerCase() === 'bronze' && 
                    <img src={bronze}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'iron' && 
                    <img src={iron}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'gold' && 
                    <img src={gold}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'master' && 
                    <img src={master}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'challenger' && 
                    <img src={challenger}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'grandmaster' && 
                    <img src={grandmaster}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'silver' && 
                    <img src={silver}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'diamond' && 
                    <img src={diamond}/>
                  }
                  {secondPrincipalLeag?.tier.toLowerCase() === 'platinum' && 
                    <img src={platinum}/>
                  }
                 <div className={styles.wins_and_loses}>
                    <h2 className={styles.wins} onMouseEnter={() => setMouseEnterWinsInSecond(true)} onMouseLeave={() => setMouseEnterWinsInSecond(false)}>{secondPrincipalLeag.wins}</h2>
                    <h2 className={styles.losses} onMouseEnter={() => setMouseEnterLossesInSecond(true)} onMouseLeave={() => setMouseEnterLossesInSecond(false)}>{secondPrincipalLeag.losses}</h2>
                    <span className={mouseEnterWinsInSecond ? `${styles.wins_enter_second} ${styles.opacity}` : `${styles.wins_enter_second}`}>{secondPrincipalLeag.wins} Vitórias</span>
                    <span className={mouseEnterLossesInSecond ? `${styles.loses_enter_second} ${styles.opacity}` : `${styles.loses_enter_second}`}>{secondPrincipalLeag.losses} Derrotas</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>  
      </div>
    </div>
  )
}
