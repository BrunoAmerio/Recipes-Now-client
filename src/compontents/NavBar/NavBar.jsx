import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { logout } from '../../redux/actions';
import axios from 'axios';
import s from './NavBar.module.scss';

//ICONOS
import fav from '../../img/fav.svg';
import userIcon from '../../img/user.svg';
import SearchIcon from '@mui/icons-material/Search';
import asc from '../../img/asc.svg';
import desc from '../../img/desc.svg';
import cutlery from '../../img/cutlery.svg';
import apple from '../../img/apple.svg';


const baseUrl = process.env.REACT_APP_BASE_URL;


const NavBar = ()=>{
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const user = useSelector(state => state.currentUser);
      const [input, setInput] = useState([]);
      const [categories, setCategories] = useState([]);

      //Toma lo ingresado del search 
      const handlerChange = (event)=>{
            console.log(event.target.value);
            setInput(event.target.value)
      }

      //Realiza la busqueda
      const handlerSubmit = (event) =>{
            event.preventDefault();
            console.log('Esto es lo que buscaremos', input)
      }

      //Activa y desctiva los menues
      const toggleUserMenu = (event)=>{
            switch(event.target.name){
                  case 'userMenu':
                        document.querySelector('#userMenu').classList.toggle(s.enable);
                        break;
                  case 'dietMenu':
                        document.querySelector('#dietMenu').classList.toggle(s.enable);
                        break;
                  }
      }


      useEffect(()=>{
            if(!categories.length){
                  axios.get(baseUrl + 'diet')
                  .then(res => {
                        const diet = [];
                        res.data.diets.forEach(item =>{
                              diet.push(item.name)
                        })
                        setCategories(diet);
                  })
            }
      },[categories]);


      return <div className={s.container}>
            <a href='/'> <h1>Recipes Now</h1> </a>

            <div className={s.searchContainer}>
                  <form className={s.search} onSubmit={handlerSubmit}>
                        <input type='text' placeholder='Search by recipes, cuisines, diets, etc..' onChange={ handlerChange }/>
                        <button type='submit'>
                              <SearchIcon/>
                        </button>
                  </form>

                  <div className={s.filterContainer}>
                        <button>
                              <img src={asc} alt='asc'/>
                              Asc
                        </button>

                        <button>
                              <img src={desc} alt='desc'/>
                              Desc
                        </button>

                        <button>
                              <img src={cutlery} alt='cutlery'/>
                              A-Z
                        </button>

                        <button name='dietMenu' onClick={(event) => toggleUserMenu(event)}>
                              <img src={apple} name='dietMenu' alt='apple'/>
                              Diets
                        </button>

                        <div className={s.dietMenu} id='dietMenu'>
                              {categories.length ? categories.map(item => {
                                    return <button key={item}>{item}</button>
                              }) : null }
                        </div>
                  </div>
            </div>

            <div className={s.sideButtons}>
                  <button onClick={(event) => !user ? navigate('/login') : toggleUserMenu(event) }>
                        <img name='userMenu' src={userIcon} alt='userIcon'/>
                  </button>

                  <div className={s.userMenu} id='userMenu'>
                        <button onClick={() => navigate('/user/recipes')}>
                              My Recipes
                        </button>
                        <button onClick={() => dispatch(logout()) }>
                              Log out
                        </button>
                  </div>

                  <button onClick={()=> navigate('/user/favorites')}>
                        <img src={fav} alt='fav'/>
                  </button>
            </div>

      </div>
}

export default NavBar;