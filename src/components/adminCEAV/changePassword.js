import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import {  MDBRow,MDBIcon, MDBCol, MDBInput, MDBBtn, MDBCard,MDBCardBody, MDBView} from 'mdbreact';
import { Form } from 'reactstrap';
// import './index.css'
import {API} from '../Graphql/Graphql'
import { Avatar,Card } from 'antd';
import { Form as form, Input, Button, Checkbox,Select,Col } from 'antd';
import { UserOutlined} from '@ant-design/icons';

class ChangePass extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:"",
            dataEmpleados:[]
        }
    }
    
    onChangeInput =(e)=>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    
    validacion(){
        if(this.state.user){
            axios({
                url:API,
                method:'post',
                data:{
                    query:`
                    query{
                        getEmpleadosByCorreo(data:"${[this.state.user]}"){
                            id_empleado
                            nombre
                            apellidos
                            correo                            
                       } 
                    }
                    `
                }   
                 }).then(datos=>{
                     console.log("esto es datos getEmpleadosByCorreo",datos)
                     if(datos.data.data.getEmpleadosByCorreo[0]){
                         this.setState({dataEmpleados:datos.data.data.getEmpleadosByCorreo[0]})
                     }else{
                         alert("El correo proporcionado no ha sido encontrado")
                     }
                 })
                 .catch(err=>{
                     console.log('error',err)
                     console.log('error',err.response)
           })
        }else{
            alert("Por favor ingrese un correo electrónico")
        }
     
    }

    onSubmitBtn = ()=>{ 
        if(this.state.pass){
            axios({
                url:API,
                method:'post',
                data:{                    
                    query:`                    
                    mutation{                        
                        updatePasswordEmpleados(data:"${[this.state.dataEmpleados.id_empleado,this.state.pass]}"){
                           message 
                       } 
                    }
                    `
                }   
                 }).then(datos=>{
                     console.log("datos updatePasswordEmpleados",datos)
                     if(datos.data.data.updatePasswordEmpleados.message === "actualización exitosa"){
                        alert(`Contraseña para ${this.state.dataEmpleados.correo} Actualizada`);
                        window.location.reload()
                     }else{
                         alert("Algo salió mal, por favor inténtelo nuevamente")
                     }
                 })
                 .catch(err=>{
                     console.log('error',err)
                     console.log('error',err.response)
           })
        }else{
            alert("Por favor ingrese una contraseña válida")

        }
 
    }
    cancelar(){
        this.props.history.push("/")
    }
  

     render(){


         let datosClientes;
         if(this.state.dataEmpleados.id_empleado){
        let rfc =  <strong>RFC</strong>
           datosClientes =  <Card style={{width:"70%"}}>
            <table>
                <tr>
                    <th><strong>Nombre:</strong></th>
                    <td>{this.state.dataEmpleados.nombre}&nbsp;{this.state.dataEmpleados.apellidos}</td>
                </tr>
            </table>   
            <center>
            <MDBBtn  style={{marginTop:"10%"}} color='success' size="sm" onClick={e=> this.onSubmitBtn()}>
             Actualizar contraseña                        
            </MDBBtn>
            </center>
            </Card>
         }
         let titulo = <center><strong><h4>Actualizar contraseña</h4></strong></center>
         return(
            <React.Fragment>
                <div id="apppages2">
               <MDBView>
                <div style={{marginTop:"3%", marginLeft:"8%"}} >
                <MDBCol md="5">
                <Card title = {titulo} style={{width:"70%"}}>       
                          
                <div className="h5 text-center mb-2">            
                </div>
                                
                <Form onSubmit={this.onSubmitBtn}  ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <center>
                <Col span={20}>
                        
                        <label><strong>correo</strong></label>                        
                            <Input id="user" type="email" name="user" onChange={this.onChangeInput} value={this.state.user} required/>
                      
                        <label><strong>contraseña</strong></label>
                            <Input.Password  id="pass" type="password" name="contrasena" onChange={this.onChangeInput} value={this.state.pass} required/>
                        
                      
                </Col> 
                 
                        <div   style= {{marginTop:"3%",marginLeft:"6%",display:"flex",alignContent:"space-between"}}>
                        {/* <MDBBtn color='primary' size="sm" onClick={e=> this.validacion()}>
                         Avanzar                            
                        </MDBBtn>
                        <MDBBtn  color='danger' size="sm" onClick={e=> this.cancelar()}>
                          Salir                        
                        </MDBBtn> */}
                        <Button className='ant-btnText' onClick={e=> this.validacion()} style={{ background: "#73d13d" }}>Validar</Button> &nbsp;&nbsp;&nbsp;
                        <Button className='ant-btnText' onClick={e=> this.cancelar()} style={{background:"#40a9ff"}} >Cancelar</Button>

                        </div>   
                        </center>         
                </Form> 
              
            </Card>
            </MDBCol> 
            <MDBCol md="5">
            {datosClientes}     
            </MDBCol>    
            </div>
            </MDBView>            
            </div> 
                      
        </React.Fragment>
        )
    }
}
export default ChangePass