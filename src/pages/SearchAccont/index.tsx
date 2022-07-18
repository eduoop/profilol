import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { SiRiotgames } from "react-icons/si";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { TbUserCircle } from "react-icons/tb";
import { api } from "../../config/api";
import { UsersSearch } from "../../types/UsersSearch";
import { toast } from "react-toastify";
import { UserProfile } from "../../components/UserProfile";
import { AddAccount } from "../../components/AddAccount";
import { AddAccountButton } from "../../components/AddAccountButton";
import yp from "../../assets/Daco_4398838.png";
import { useNavigate } from "react-router-dom";

export const SearchAccont = () => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [addingAccount, setAddingAccount] = useState(false);
  const [goOut, setGoOut] = useState(false);
  const [user, setUser] = useState<UsersSearch>();
  const [loggedUser, setLoggedUser] = useState<UsersSearch>();
  const [userSearched, setuserSearched] = useState("");
  const apikey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate()
  const loggedUserCookie = localStorage.getItem("loggedUser");

  console.log(apikey);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    setUser(undefined);
    e.preventDefault();
    setSearching(true);
    if (search.length === 0) {
      setSearching(false);
      toast.error("Preencha o campo", {
        hideProgressBar: true,
        pauseOnHover: false,
      });
      setuserSearched("");
      return false;
    }
    api
      .get(`/lol/summoner/v4/summoners/by-name/${search}?${apikey}`)
      .then((res) => {
        setSearching(false);
        setUser(res.data);
        setuserSearched("");
        console.log(res.data);
      })
      .catch((err) => {
        setSearching(false);
        console.log(err);
        setuserSearched(search);
      });
  };

  const goOuts = () => {
    localStorage.removeItem('loggedUser')
    setLoggedUser(undefined)
    setGoOut(false)
  }

  useEffect(() => {
    if (loggedUserCookie) {
      setLoggedUser(JSON.parse(loggedUserCookie));
    }
  }, [loggedUserCookie]);

  return (
    <div className={styles.container}>
      <div className={styles.add_account_container}>
        {loggedUser && (
          <div className={styles.logged_user_icon}>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/${loggedUser?.profileIconId}.png`} onClick={() => setGoOut(!goOut)}/>
            { goOut &&
                <div className={styles.menu}>
                    <div className={styles.goOut} onClick={() => goOuts()}>
                        <h1>Sair</h1>
                        <FiLogOut/>
                    </div>
                    <div className={styles.goOut} onClick={() => navigate(`/profile/${loggedUser.name}`)}>
                        <h1>Perfil</h1>
                        <TbUserCircle/>
                    </div>
                </div>
            }
          </div>
        )}
        {addingAccount && (
          <div className={styles.add_card}>
            <AddAccount setAddingAccount={setAddingAccount} />
          </div>
        )}
        {!loggedUser && (
          <AddAccountButton setAddingAccount={setAddingAccount} />
        )}
      </div>
      <form onSubmit={(e) => submit(e)} className={styles.form_search}>
        <input
          type="text"
          placeholder="Busque sua conta"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {searching ? (
          <button disabled className={styles.waiting}>
            <SiRiotgames />
          </button>
        ) : (
          <button type="submit" className={styles.sub_btn}>
            <SiRiotgames />
          </button>
        )}
      </form>
      {user && (
        <div className={styles.user_profile}>
          <UserProfile user={user} />
        </div>
      )}
      {userSearched && (
        <div className={styles.user_not_find}>
          <p>
            Usuário <span>{userSearched}</span> não encontrado
          </p>
          <img src={yp} alt="" />
        </div>
      )}
    </div>
  );
};
