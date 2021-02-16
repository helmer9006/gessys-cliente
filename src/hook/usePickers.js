import { Form } from 'native-base'
import {useState} from 'react'

const getJSON = (obj={}, fields=[], undefined_response='') => {
    /**
     * 
     * @param {*} object 
     * @param {*} path 
     * Esta función (getOBJ) se encarga de obtener un objeto proviniente de un json 
     * llamado object, su principal funcionabilidad es la de que no se crashee la app
     * al tratar de obtener un objeto de un undefined o null, si ese objeto existe, se retorna
     * si no, se retorna undefined, tiene la misma funcion que el método get de lodash
     */
    const getOBJ = (object, path=[]) => {
        if(!Array.isArray(path)) return null
        let getted = object
        path.forEach(value => {
            getted = getted?getted[value]?getted[value]:null:null
        })
        return getted
    }

    if (typeof(obj) !== 'object' || !Array.isArray(fields) ) return undefined_response
    return getOBJ(obj, fields)?getOBJ(obj, fields):undefined_response
}

let usePickers = ({initialValues}) => {
    const [fields, setFields] = useState(()=>{
        let _initialValues = {}
        for(let obj in initialValues){
            _initialValues={..._initialValues, [obj]:{data:[], fetched:false, selected_value:''}}
        }
        return{..._initialValues}
    })

    return{
        fields,
        getPicker: (name) => ({
            name,
            onValueChange : (value) =>{
                setFields({...fields, [name]:{...fields[name],selected_value:value}})
            }
        }),
        getSelectedValue: (name) => {
            if(!name || !fields[name]) return ''
            return fields[name].selected_value
        },
        onValueChange:(name, value) => {
            if(name && value) setFields(prev => {return{...prev, [name]:{...fields[name],selected_value:value}}})
        },
        setPickers: (name, value) => {
            if(Array.isArray(value)) setFields(prev => {return{...prev, [name]:{data:value, fetched:true, selected_value:''}}})
        },
        ValidatePickers: () => {
            for (let obj in fields){
                if(!fields[obj].fetched) return false
            }
            return true
        },
        getStrinsgValuesFromArray: (arr=[], fields=[]) => {
            if(!Array.isArray(arr) || !Array.isArray(fields)) return['']
            return arr.map(element => getJSON(element, fields, ''))
        },
        getPickerValues: (name) => {
            if(fields[name].data.length===0 || !name) return['']
            return fields[name].data
        },
        getAllValues: () => {
            let _fields = {}
            for (let obj in fields){
                _fields = {..._fields, [obj]: fields[obj].selected_value}
            }
            return _fields
        }
    }
}

export default usePickers