import lodash from 'lodash'

 const getJson = (obj={}, path=[], vacio = '')=> {

    if(typeof(obj) === 'object' && Array.isArray(path)){
        return lodash.get(obj, path) ? lodash.get(obj, path) : vacio
    }
    return vacio
}

export default getJson
