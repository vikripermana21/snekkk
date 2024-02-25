import axios from "axios"

export const getExplore = (params:object) => {
    return axios.get(`https://spotify23.p.rapidapi.com/search`,{
        params,
        headers: {
            'X-RapidAPI-Key': 'c6adcca4d9msh81294126cc105afp171e1ajsn1bce337fff20',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
    })
}