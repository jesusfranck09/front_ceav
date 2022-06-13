export default ()=>{
    if(localStorage.getItem("TokenAdmin")){
        return true

    }else{
        return false

    }
}