import React, {Component} from 'react'
import { MDBModal,MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardBody,MDBCardTitle,
        MDBCardText,MDBBtn,MDBIcon,MDBModalHeader,MDBModalBody,MDBModalFooter } from 'mdbreact'
import { Avatar,Form,Card  } from 'antd'
import { Col} from 'reactstrap'
// import './catalogo.css'
import { UserOutlined, RightOutlined} from '@ant-design/icons';
import {API} from '../Graphql/Graphql'
import axios from 'axios'
import swal from 'sweetalert'
class MiCuentas extends Component{
    constructor(props){
        super(props)
        this.state={ 
          modal1: false,
          user:"",
          pass:"",
         dataEmpleados:[]

        }
        this.toggle1 = this.toggle1.bind(this)   
    }

    toggle1 = () => {
      this.setState({
        modal1: !this.state.modal1
      });
    }

    cerrarSesion(){
      this.props.history.push("/")
    }
    
    cerrar(){
      this.setState({formularioInicio:true})
      this.setState({formularioContraseña:false})
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
                        telefono
                        ext
                        area
                        ubicacion
                   } 
                }
                `
            }   
             }).then(datos=>{
                 console.log("esto es datos getEmpleadosByCorreo",datos)
                 if(datos.data.data.getEmpleadosByCorreo[0]){
                     this.setState({dataEmpleados:datos.data.data.getEmpleadosByCorreo[0]})
                 }else{
                     swal({
                       icon:"error",
                       text:"El correo proporcionado no ha sido encontrado",
                       button:false})
                     this.setState({modal1:false})
                     this.setState({user:[],pass:[]});   
                 }
             })
             .catch(err=>{
                 console.log('error',err)
                 console.log('error',err.response)
       })
      }else{
          swal({
            icon:"warning",
            text:"Por favor ingrese un correo electrónico",
            button:false
          })
          this.setState({modal1:false})
      } 
    }

    onSubmitBtn = ()=>{ 
      // console.log.log("estado de dataEmpleados.id_empleado", this.state.dataEmpleados) 
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
                      swal({
                        icon:"success",
                        text:`Contraseña para ${this.state.dataEmpleados.correo} Actualizada`,
                        button:false,
                        timer: 3000,
                      });
                      localStorage.removeItem('TokenEmpleados')
                      // sessionStorage.removeItem('TokenEmpleados')
                      localStorage.removeItem('id_empleado')
                      localStorage.removeItem('nombre')
                      localStorage.removeItem('apellidos')
                      localStorage.removeItem('correo')
                      localStorage.removeItem('telefono')
                      localStorage.removeItem('ext')
                      localStorage.removeItem('area')
                      localStorage.removeItem('puesto')
                      localStorage.removeItem('ubicacion')
                      setTimeout(function(){
                        window.location.href = '/';
                     }, 700);
                     
                   }else{
                       swal({
                         icon:"warning",
                         text:"Algo salió mal, por favor inténtelo nuevamente",
                         button:false,
                         timer: 3000,
                       })
                   }
               })
               .catch(err=>{
                   console.log('error',err)
                   console.log('error',err.response)
         })
      }else{
          alert({
            icon:"error",
            text:"Por favor ingrese una contraseña válida",
            button:false,
            timer: 3000,
          })

      }
  }
  cancelar(){
    this.setState({toggle1:false})       
}

    render(){
      let nombre = localStorage.getItem("nombre")
      let apellidos = localStorage.getItem("apellidos")
      let correo = localStorage.getItem("correo")
      let telefono = localStorage.getItem("telefono")
      let ext = localStorage.getItem("ext")
      let area = localStorage.getItem("area")
      let puesto = localStorage.getItem("puesto")
      let ubicacion = localStorage.getItem("ubicacion")
    
        let formulario=
        <MDBContainer style={{marginTop:"2%", marginBottom:"5%"}}>
        <MDBRow>
         <MDBCol md="4">
        <MDBCol style={{width:"100%"}} >
         <MDBCard>          
           <MDBCardBody>
             <center>
             <Avatar   className='useLogo' size={64}  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />           
               <br></br>               
             <MDBCardTitle>{nombre}&nbsp;{apellidos}</MDBCardTitle>
             <MDBCardText><MDBIcon far icon="envelope" />&nbsp;{correo}</MDBCardText>
             <MDBCardText><MDBIcon icon="phone" />&nbsp;{telefono}&nbsp; Ext:{ext}</MDBCardText>
             <MDBCardText>Area:{area}</MDBCardText>
             <MDBCardText>Puesto:{puesto}</MDBCardText>
             <MDBCardText><MDBIcon icon="map-marked-alt" />&nbsp;{ubicacion}</MDBCardText>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             </center>
           </MDBCardBody>
        </MDBCard>
       </MDBCol> 
         </MDBCol>
          <MDBCol md="8">
            <MDBCard>          
            <MDBCardBody>
              <center>
              <MDBCardTitle>Contraseña</MDBCardTitle>
              {/* <Avatar className='useLogo' size={64}  > */}
                <MDBIcon icon="key mdb-gallery-view-icon" size="4x" style={{marginTop:"1%",marginBottom:"3%"}}/>
                {/* </Avatar> */}
              <MDBCardText>Aumente la seguridad de su contraseña o cámbiela si otra persona la sabe.</MDBCardText>
              <MDBBtn onClick={this.toggle1}>CAMBIAR CONTRASEÑA <RightOutlined /></MDBBtn>
              </center>
            </MDBCardBody>
          </MDBCard>           
          </MDBCol>        
        </MDBRow>
      </MDBContainer>

         let datosClientes;
         if(this.state.dataEmpleados.id_empleado){
        let rfc =  <strong>RFC</strong>
           datosClientes =  <Card style={{width:"70%"}}>
            <table>
                <tr>
                    <th width="30%"><strong>Correo:</strong></th>
                    <td width="70%">{this.state.dataEmpleados.area}</td>
                </tr>
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
         let Buttonactualizar;
         if(this.state.dataEmpleados.id_empleado){
          Buttonactualizar= <div>
          <center>
         <MDBBtn  style={{marginTop:"10%"}} color='success' size="sm" onClick={e=> this.onSubmitBtn()}>
          Actualizar contraseña                        
         </MDBBtn>
         </center>
         </div>
         } 

      let modal1 =
      <div>
        <MDBContainer>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle1}>
          <MDBModalHeader toggle={this.toggle1}>Cambiar Contraseña</MDBModalHeader>
          <MDBModalBody>
          <Form  onSubmit={this.onSubmitBtn} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <center>
                <Col span={20}>                        
                  <label><strong>correo</strong></label>                        
                  <input id="user" type="email" name="user" onChange={this.onChangeInput} value={this.state.user} required/>
                  <label><strong>contraseña</strong></label>
                  <input  id="pass" type="password" name="contrasena" onChange={this.onChangeInput} value={this.state.pass} required/>                      
                </Col> 
                  <div style= {{alignContent:"space-between"}} className="text-center">
                  <MDBBtn color="info" size="sm" onClick={e=> this.validacion()} >
                    Validar                          
                  </MDBBtn >
                  <MDBBtn color="deep-orange" size="sm" onClick={this.toggle1} >
                    Cancelar                        
                  </MDBBtn>
                  </div>   
                  </center>         
          </Form> 
                {Buttonactualizar}    
          </MDBModalBody>
          <MDBModalFooter>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      </div>
 
        return(
            <React.Fragment>
               {formulario}
               {modal1}
            </React.Fragment>
        )   
    }

}export default MiCuentas