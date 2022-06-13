import axios from 'axios'
import React,{Component} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
 import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { MDBCol, MDBBtn, MDBCardBody, MDBView, MDBIcon,MDBRow} from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { Form,Row} from 'reactstrap';
import './login.css'
import {API} from '../Graphql/Graphql'
import { Card } from 'antd';
import { Modal, Button as Boton , Input} from 'antd';
import {  UserOutlined} from '@ant-design/icons';
import swal from 'sweetalert';
import 'antd/dist/antd.css'
import Logo from '../imagen/CEAVlogo.png'


class login extends Component{
    constructor(props){
        super(props)
        this.state ={
            user:"",
            pass:"",
            isModalVisible:false
          }
    }
     componentWillMount(){
        localStorage.removeItem("id_empleado")
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellidos")
        localStorage.removeItem("correo")
        localStorage.removeItem("telefono")
        localStorage.removeItem("ext")
        localStorage.removeItem("area")
        localStorage.removeItem("puesto")
        localStorage.removeItem("ubicacion")
        localStorage.removeItem("TokenEmpleados")
    }
    
    onChangeInput =(e)=>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    
    onSubmitBtn = (e)=>{        
        e.preventDefault();            
        axios({
            url:API,
            method:'post',
            data:{
                query:`
                query{
                    loginEmpleado(data:"${[this.state.user,this.state.pass]}"){
                        id_empleado
                        nombre
                        apellidos
                        correo
                        telefono
                        ext
                        area
                        puesto
                        ubicacion                        
                        message     
                        token                            
                   } 
                }
                `
            }   
             }).then(response=>{
                 console.log("esto es response",response)
                 let mensaje = response.data.data.loginEmpleado.message
                if(mensaje ==="login exitoso"){                    
                    localStorage.setItem("id_empleado",response.data.data.loginEmpleado.id_empleado)                    
                    localStorage.setItem("nombre",response.data.data.loginEmpleado.nombre)   
                    localStorage.setItem("apellidos",response.data.data.loginEmpleado.apellidos) 
                    localStorage.setItem("correo",response.data.data.loginEmpleado.correo)
                    localStorage.setItem("telefono",response.data.data.loginEmpleado.telefono) 
                    localStorage.setItem("ext",response.data.data.loginEmpleado.ext) 
                    localStorage.setItem("area",response.data.data.loginEmpleado.area)
                    localStorage.setItem("puesto",response.data.data.loginEmpleado.puesto) 
                    localStorage.setItem("ubicacion",response.data.data.loginEmpleado.ubicacion)                                    
                    localStorage.setItem("TokenEmpleados",response.data.data.loginEmpleado.token)

                    this.props.history.push("/side")
                      
                      
                    swal({
                        title:"Bienvenido!",
                        text:"Inicio de sesión exitoso",
                        buttons: false,
                      }); 
                   
                }
                else if(response.data.data.loginEmpleado.message === "usuario o contraseña incorrecto"){  
                    swal({                        
                        text: "Email o Contraseña incorrecto",
                        icon:"error",
                        buttons: false,
                      }
                     );                  
                }else {
                         
                    swal({
                        text:"Algo salio mal, por favor vuelva a intentarlo",
                        icon:"warning",
                        buttons: false,
                      });            
                }
             })
             .catch(err=>{
                 console.log('error',err.response)
             })
             this.setState({user:""})
             this.setState({pass:""})
    }
    showModal = () => {
          this.setState({isModalVisible:true});
      };
    
      handleOk = () => {
        this.setState({isModalVisible:false});
      };
    
      handleCancel = () => {
        this.setState({isModalVisible:false});
      };

     render(){
         let modal;
         if(this.state.isModalVisible === true){
             modal = <Modal title="Aviso!" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
             <h6>Inicio de sesión exitoso</h6>
           </Modal>
         }
         let titulo = <center><strong><h3>Iniciar sesión</h3></strong></center>
         return(
            <React.Fragment>
            
                <div id="apppagesLogin">
                <MDBView>
                    <MDBRow style={{marginTop:"5%"}}>
                        <MDBCol md="6" >
                         <img src={Logo} className="logo"></img>
                        </MDBCol>
                        <MDBCol md="4"  >
                            {/* <center> */}
                        <Card title = {titulo} style={{width:"80%"}}  >       
                <div className="h5 text-center " > 
                  <MDBIcon far icon="user-circle"   size='4x' style= {{color:"#626263"}} />  
                </div>                          
                <MDBCardBody>  
                <Form onSubmit={this.onSubmitBtn}>
                <center>
                    <MDBCol md="12">                     
                    <label>Correo</label>
                        <Input  prefix={<UserOutlined />} 
                        id="user"
                        type="email"
                        name="user"
                        placeholder="Correo"
                        onChange={this.onChangeInput}
                        value={this.state.user}
                        /> 
                      </MDBCol>                       
                      <MDBCol md="12"  style= {{marginTop:"5%"}}> 
                         <label>Contraseña</label>                        
                        <Input.Password placeholder="Contraseña"  
                          id="pass"
                          type="password"
                          name="contrasena"
                          onChange={this.onChangeInput}
                          value={this.state.pass}
                         /> 
                       </MDBCol>        
                       </center>
                        <div style={{marginTop:"5%"}}>
                        <center>
                        <MDBBtn  color='success' type="submit" size="sm">
                        iniciar sesión                            
                        </MDBBtn>
                        </center>
                        </div>  
                </Form> 
                </MDBCardBody>
                 <center>¿No recuerdas tu contraseña?<a href="/passwordUpdate">Cambiar contraseña</a> </center>
            </Card>
            {/* </center> */}
                        </MDBCol>
                    </MDBRow> 
                </MDBView>
            </div>    
            {modal}  
           
        </React.Fragment>
        )
    }
}
export default login