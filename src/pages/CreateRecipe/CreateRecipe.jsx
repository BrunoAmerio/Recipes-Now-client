import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import s from './CreateRecipe.module.scss';

//COMPONENTES
import {countries} from '../../utils/countries';
import { useDropzone } from 'react-dropzone';
import NavBar from '../../compontents/NavBar/NavBar';
import {TextField, Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material';
import { notifyError, notifySuccess } from '../../utils/notify';

const baseUrl = process.env.REACT_APP_BASE_URL;


const CreateRecipe = ()=>{
      const formData = new FormData();
      const currentUser = useSelector( state => state.currentUser);
      const [diets, setDiets] = useState([]);
      const [data, setData] = useState();
      const [image, setImage] = useState();
      const [recipe, setRecipe] = useState({
            title : '',
            summary : '',
            diets : [],
            cuisines : [],
            readyInMinutes : 0,
            instructions : '',
            Servings : 0
      });

      const handlerChange = (event) =>{
            switch(event.target.name){
                  case 'diets':
                        setRecipe({
                              ...recipe,
                              diets : [...recipe.diets, event.target.value]
                        });
                        break;

                  case 'cuisines' :
                        setRecipe({
                              ...recipe,
                              cuisines : [...recipe.cuisines, event.target.value]
                        });
                        break;

                  default :
                        setRecipe({
                              ...recipe,
                              [event.target.name] : event.target.value
                        })
            };

            //Seteamos la informacion que enviaremos al back
            const claves = Object.keys(recipe);
            claves.forEach(clave =>{
                  formData.append(clave, recipe[clave])
            });
            //Y que no se nos olvide de la imagen subida
            formData.append('image', image);
            setData(formData);
      };


      const handlerSubmit = () => {
            axios.post(baseUrl + `recipe/${currentUser._id}`, data)
            .then(res => notifySuccess(res.data.success))
            .catch(err => notifyError(err.response.data.error));
      }


      //CONFIGURACION DE DROPZONE
      const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		maxFiles: 1,
		accept: 'image/jpg ,image/jpeg, image/png',
		onDrop: (acceptedFiles, fileRejections) => {
                  setImage(acceptedFiles[0]);
		},
	});



      useEffect(()=>{
            if(!diets.length){
                  axios.get(baseUrl + 'diet')
                  .then(res => setDiets(res.data.diets));
            }
      })


      return <div className={s.container}>
            <NavBar/>
            <div className={s.formContainer}>
                  <div className={s.dropZone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Puede arrastrar las imagenes en esta zona (1 max)</p>
                  </div>
                  <FormControl sx={{ m: 1, minWidth: 220 }} className={s.form1}>

                        <InputLabel id='diet-label'>Diets</InputLabel>
                        <Select
                              labelId='diet-label'
                              name='diets'
                              defaultValue={''}
                              onChange={handlerChange}
                        >
                              {diets.length ? diets.map(item =>{
                                    return <MenuItem key={item.name} value={item.name} >{item.name}</MenuItem>
                              })
                              : null}
                        </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 220 }} className={s.form2}>
                        <InputLabel id='cuisines-label'>Cuisines</InputLabel>
                        <Select
                              labelId='cuisines-label'
                              name='cuisines'
                              defaultValue={''}
                              onChange={ handlerChange }
                        >
                              {countries.length ? countries.map(item =>{
                                    return <MenuItem value={item.value} key={item.value}> {item.value} </MenuItem>
                              })
                              : null}
                        </Select>

                        <TextField
                              label='Title'
                              name='title'
                              onChange={ handlerChange }
                        />
                        <label>Summary</label>
                        <textarea 
                              name='summary'
                              onChange={handlerChange}
                        />
                        <label>Instructions</label>
                        <textarea 
                              name='instructions'
                              onChange={handlerChange}
                        />
                        <TextField 
                              type='number'
                              label='Ready in minutes'
                              name='readyInMinutes'
                              onChange={handlerChange}
                        />
                        <TextField
                              type='number'
                              label='Serving'
                              name='Servings'
                              onChange={handlerChange}
                        />
                  </FormControl>
            </div>
            <Button variant='contained' onClick={handlerSubmit}>Create Recipe</Button>
      </div>

};

export default CreateRecipe;