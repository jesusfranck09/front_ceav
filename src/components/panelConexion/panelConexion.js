import React,{Component} from 'react'
import {Button, Card} from 'antd'
import { MDBContainer, MDBRow,MDBView} from "mdbreact";
import { MDBBtn,MDBCard,MDBCardBody,MDBCardImage,MDBCardTitle,MDBCardText,MDBCol } from 'mdbreact';
import img1 from '../imagen/imgRolAdmin.svg'
import img2 from '../imagen/imgAdmin.svg'
import img3 from '../imagen/imgUser.svg'
// import I from '../imagen';
import { UserOutlined, RightOutlined} from '@ant-design/icons';


 class PanelConexion extends Component{
     constructor(props){
        super(props)
        this.state = {

        }
     }

     direccionamientoAdmin(){
        this.props.history.push("/")
     }
     direccionamientoUser(){
        this.props.history.push("/")
     }
     direccionamientoRegistro(){
        this.props.history.push("/")
     }
     render(){
         let formulario=
          <div>
               <MDBContainer style ={{ marginTop:"10%"}}>
                <MDBRow>
                  
                    <MDBCol md="4">
                    <a href='/'>
                    <MDBCol >
                    <MDBView hover zoom>              
                    <MDBCard  >
                        <MDBCardImage className="img-fluid" src={img1}
                        waves />
                        <MDBCardBody>
                        <MDBCardTitle><center>Registrar Administrador</center></MDBCardTitle>
                        <div className="text-center">
                        <MDBBtn size="sm" onClick={this.direccionamientoRegistro} >Ir <RightOutlined /></MDBBtn>
                        </div>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBView>
                    </MDBCol> 
                    </a>                  
                    </MDBCol>

                    <MDBCol md="4">
                    <a href='/'>
                    <MDBCol >
                    <MDBView hover zoom>    
                        <MDBCard>
                        <MDBCardImage className="img-fluid" src={img2}
                            waves />
                        <MDBCardBody>
                            <MDBCardTitle><center>Portal Administración</center></MDBCardTitle>
                            <div className="text-center">
                        <MDBBtn size="sm" onClick={this.direccionamientoAdmin} >Ir <RightOutlined /></MDBBtn>
                        </div>
                        </MDBCardBody>
                        </MDBCard>
                        </MDBView>    
                    </MDBCol>
                    </a>
                    </MDBCol>
                    <MDBCol md="4">
                    <a href=''>
                    <MDBCol >
                    <MDBView hover zoom>    
                    <MDBCard>
                        <img className="img-fluid" src={img3} />
                        <MDBCardBody>
                        <MDBCardTitle><center>Portal Usuarios</center></MDBCardTitle>
                        <div className="text-center">
                        <MDBBtn size="sm" onClick={this.direccionamientoUser} >Ir <RightOutlined /></MDBBtn>
                        </div>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBView>    
                    </MDBCol>
                    </a>   
                    </MDBCol>
                    <MDBCol>  
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
          </div>
         return(
             <React.Fragment>
               {formulario}
            </React.Fragment>
         )
     }
 }export default PanelConexion