import React, {Component} from 'react'
import { Card,Form , Input, Button,Select,Menu  } from 'antd'
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import swal from 'sweetalert';
import MUIDataTable from "mui-datatables";
import { Row,Col,Form as form } from 'reactstrap'
import { EditOutlined,IssuesCloseOutlined} from '@ant-design/icons';
import './sideNavAdmin.css'
import { MDBBtn,MDBContainer,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter,MDBRow,MDBCol,MDBIcon } from 'mdbreact';

class catalogoPersonal extends Component{
    constructor(props){
        super(props)
        this.state={
          tipoPersonal:'',
          tablaPersonal:[],
          inicioPersonal:true,
          tablarenderPersonal:false,
          ArrayPersonal:[],
          modal:false,
          id_personalUpdate:"",
          tipoPersonalUpdate:""
        }
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount(){ 
      axios({
        url:API,
        method:'post',
        data:{
          query:`
            query{   
              getTablaPersonal(data:"${[]}"){
                id_personal
                tipoPersonal
                message
                } 
            }
            `  }           
         })
       .then(response => { 
          this.setState({tablaPersonal:response.data.data.getTablaPersonal}) 
        })
        .catch(err=>{
           console.log('error' ,err.response)
        })     
  }

    onClear = ()=>{
        this.state = {
            tipoPersonal:''

        }       
    }
    tablainicio(){
     this.setState({inicioPersonal:true})
     this.setState({tablarenderPersonal:false})
    }
    tablaPersonal(){
     this.setState({inicioPersonal:false})
     this.setState({tablarenderPersonal:true})
    }   

    onChangeInput = (e) =>{
        // console.log("esto es onChangeInput",e)
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    onChangeInput2 = (e) => {
      const { id, value } = e.target;  
      this.setState({
        [id]: value
      });
    };
    editar(id){ 
      this.setState({ArrayPersonal:id})  
      this.setState({
        id_personalUpdate:id.id_personal,
        tipoPersonalUpdate:id.tipoPersonal
      })
          this.setState({
            modal:!this.state.modal
          });   
    }
    toggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    }   

     onSubmitBtn =(e)=>{
         let tipoPersonal = this.state.tipoPersonal.toUpperCase()      
        if(tipoPersonal){  
            axios({
           url: API,
           method: "post",
           data: {
             query: `
                     mutation{
                        signupCatPersonal(data:"${[tipoPersonal]}"){  
                         message
                          } 
                     }
                     `
           }
         })
           .then((response) => { 
            if(response.data.data.signupCatPersonal.message === "registro exitoso"){
                swal({              
               title: "", 
               text:"Registro exitoso!",              
               icon: "success",
               button:false,
               timer: 1500
             });  
             this.setState({tipoPersonal:[]})          
           }else{
            swal({
               title:"Error!",
               text: "Algo salio mal, intentalo nuevamente",
               icon: "error",
               button:false
             }); 
           }          
           }).catch((err) => {
             console.log("error", err.response);
           });     
     
         }else{
            swal({
             title:"Notificación del sistema",
             text: "Por favor llene los campos obligatorios *",
             icon: "warning",             
             button:false
           }); 
         }        
       };

       onSubmitBtn2 = (e) => {
        e.preventDefault(); 
        let id_personalUpdate = this.state.id_personalUpdate
        let tipoPersonalUpdate = this.state.tipoPersonalUpdate.toUpperCase();
         if( tipoPersonalUpdate ){
           axios({
          url: API,
          method: "post",
          data: {
            query: `
             mutation{
              updatePersonal(data:"${[id_personalUpdate,tipoPersonalUpdate]}"){ 
               message
            } 
        }
        `
          }
        })     
          .then((response) => {   
            if(response.data.data.updatePersonal.message==="actualizacion exitosa"){
              swal({
                title:"",
                text:"Los datos se actualizarón correctamente",
                icon:"success",
                buttons:false,
                timer:1000
              })
              this.setState({modal:false})
              setTimeout(function(){
                window.location.reload()
                 }, 1500);
            }  else{
              swal({
                title:"",
                text:"Algo salió mal, por favor complete todos los campos  nuevamente",
                icon:"warning",
                buttons:false,
                timer:1000
              })
            }         
            
          })
          .catch((err) => {
            console.log("error", err.response);           
          }); 
        }      
       };

    
    render(){ 
      const { Option } = Select;
      let formulario;
      let tablaFormulario;
      let botonEditar;  
      let modal;

      const options={ 
        filterType:"drowpdawn",
        responsive: "stacked",
        print:false,
        download:false,
        viewColumns:false,
        filter: false,
        elevation:1,
        selectableRows:"none",
        rowsPerPage:5,
        textLabels:{
        body: {
          noMatch: "Lo sentimos, no se encontraron registros coincidentes",
          toolTip: " Ordenar",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
        pagination: {
          next: "Página siguiente",
          previous: "Página anterior",
          rowsPerPage: "Filas por página:",
          displayRows: "de",
        },
        toolbar: {
          search: "Buscar",
          downloadCsv: " Descargar CSV",
          print: "Imprimir ",
          viewColumns: "Ver columnas",
          filterTable: "Tabla de filtros",
        },
        filter: {
          all: "Todos",
          title: "FILTROS",
          reset: "RESET",
        },
        viewColumns: {
          title: "Mostrar columnas",
          titleAria: "Mostrar / Ocultar columnas de tabla",
        },
        selectedRows: {
          text: "fila (s) seleccionadas",
          delete: "Eliminar",
          deleteAria: "Eliminar filas seleccionadas",
        },      
      }        
      } 
       let titulo=<h5><strong>TIPO PERSONAL CEAV</strong></h5>
      if(this.state.inicioPersonal === true){
        formulario =         
        <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%"}}>
             <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
  <Form onSubmitBtn={this.onSubmitBtn}>
      <Form.Item label="tipo de personal" required >
        <Input style={{ width: 400 }} placeholder="" id="tipoPersonal" name="tipoPersonal" type="text" onChange={this.onChangeInput} value={this.state.tipoPersonal}/>
      </Form.Item>     
      <Form.Item>
        <div className="text-center">                   
                <Button className='ant-btnText' onClick={e=>this.onSubmitBtn()} style={{ background: "#73d13d" }}>GUARDAR</Button> &nbsp;&nbsp;&nbsp;
                <Button className='ant-btnText' onClick={e=>this.onClear()} style={{background:"#40a9ff"}} >CANCELAR</Button>
            </div> 
        </Form.Item>
  </Form>
    </Form> 
        </Card>
        }

          const columns = ["ID","TIPO PERSONAL","EDITAR"]
          // let botonEditar;
      

          let data = this.state.tablaPersonal.map((rows)=>{
            botonEditar = <div>            
            <Button type="link" shape="circle" size="large"
              onClick={(e)=>this.editar(rows)}
              >
            <MDBIcon icon="user-edit" />
            </Button>
          </div>
            return([rows.id_personal,rows.tipoPersonal,botonEditar])
          })
          if(this.state.tablarenderPersonal === true){
            tablaFormulario=      
              <Card>
                <MUIDataTable    
                title={"TIPO PERSONAL CEAV" }
                data={data}
                columns={columns}
                options={options}
                />
              </Card>    
          }

          modal=
          <div>
            <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>EDITAR PERSONAL</MDBModalHeader>
            <MDBModalBody>
            <MDBContainer>
            <form onSubmit={this.onSubmitBtn2}>
                <MDBRow>
                  <MDBCol style={{marginTop:"5%", marginBotton:"5%"}}>
                  {/* <form onSubmit={this.onSubmitBtn2}> */}
              <Row>
                <Col xs="6">
                <label htmlFor="defaultFormLoginPasswordEx"> <strong>PERSONAL:</strong></label>
                           <input                                              
                                id="tipoPersonalUpdate"
                                type="text"
                                name="tipoPersonalUpdate"
                                onChange={this.onChangeInput2}
                                value={this.state.tipoPersonalUpdate}
                                className="form-control"                                
                                />
                  
                  </Col>                 
              </Row>  
              <div style={{marginTop:"3%"}} className="text-center">
                  <MDBBtn outline color="secondary"  type="submit" size='sm' >                   
                    GUARDAR
                  </MDBBtn>
                  <MDBBtn
                    outline color="danger"
                    size='sm'
                    onClick={e=>this.toggle()}                >
                  CANCELAR
                  </MDBBtn>                   
              </div>           
             
            </MDBCol>
          </MDBRow>
          </form>
        </MDBContainer>             
            </MDBModalBody>
            <MDBModalFooter>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
          </div>
        
        return(
      <React.Fragment>   
      <Menu mode="horizontal" className='menuSide' defaultSelectedKeys={['mail']}>
        <Menu.Item key="mail"  icon={<EditOutlined />} onClick={e=>this.tablainicio()}>
        REGISTRAR PERSONAL
        </Menu.Item>
        <Menu.Item key="mail" icon={<IssuesCloseOutlined />} onClick={e=>this.tablaPersonal()}>
        INF. DEL PERSONAL
        </Menu.Item>
        </Menu>
        {formulario}
        {tablaFormulario}
        {modal}
      </React.Fragment>
        )
    }
    
}export default catalogoPersonal