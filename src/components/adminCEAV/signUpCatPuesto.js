import React,{Component} from 'react'
import { Card,Form,  Input, Button,Select } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import swal from 'sweetalert';
import {MDBIcon,MDBRow,MDBCol}     from 'mdbreact'
import MUIDataTable from "mui-datatables";
import { Menu } from 'antd';
import { EditOutlined,IssuesCloseOutlined } from '@ant-design/icons';
import './sideNavAdmin.css'
import {Row,Col,Form as form} from 'reactstrap'
import { MDBContainer,MDBBtn,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter } from 'mdbreact';
import { ThreeDRotationSharp } from '@material-ui/icons';


class catalogoPuesto extends Component{
  constructor(props){
    super(props)
    this.state={
      nombrePuesto:'',
      fk_Puesto:'',
      nivel:'',
      tablaPuesto:[],
      inicioPuesto:true,
      inicioNiveles:false,
      tablarenderPuesto:false,      
      ArrayPuesto:[],
      modal:false,
      id_puestoUpdate:"",
      nombrepuestoUpdate:"",
      nivelUpdate:"",
      tablaPuestoANDNiveles:[]
    }
    this.toggle = this.toggle.bind(this)
    this.onChangeInput2 = this.onChangeInput2.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
 
 componentDidMount(){
    axios({
      url:API,
      method:'post',
      data:{
        query:`
          query{   
            getTablaPuesto(data:"${[]}"){
              id_puesto
              puesto
              message
              } 
          }
          `  }           
       })
     .then(response => { 
       console.log("esto es response de get",response)
        this.setState({tablaPuesto:response.data.data.getTablaPuesto}) 
      })
      .catch(err=>{
         console.log('error' ,err.response)
      }) 

      axios({
        url:API,
        method:'post',
        data:{
          query:`
            query{   
              getTablaPuestoAndNivel(data:"${[]}"){
                id_puesto
                puesto
                id
                nivel
                fk_puesto
                message
                } 
            }
            `  }           
         })
       .then(response => { 
         console.log("esto es response de get",response)
          this.setState({tablaPuestoANDNiveles:response.data.data.getTablaPuestoAndNivel}) 
        })
        .catch(err=>{
           console.log('error' ,err.response)
        }) 
    }

  onChangeInput = (e) =>{
    // console.log("esto es onChangeInput",e)
    const {id,value} = e.target;
    this.setState({
        [id]:value
    })
}
onChangeInput2 = (e) =>{
  // console.log("esto es onChangeInput",e)
  const {id,value} = e.target;
  this.setState({
      [id]:value
  })
}
onChangeInput3 = (e) =>{
  // console.log("esto es onChangeInput",e)
  const {id,value} = e.target;
  this.setState({
      [id]:value
  })
}
//  onSearch = (value: string) => {
//   console.log('search:', value);
//  };
//   onChange = (value: string) => {
//   console.log(`selected ${value}`);
//   };
  handleChange(value){
    console.log("esto es fk_puesto",value)
    this.setState({fk_Puesto:value})
  }
onClear = ()=>{
  this.state = {
    nombrePuesto:''
  }       
}
editar(id){ 
  console.log("id",id)
  console.log("array",this.state.ArrayPuesto)
  this.setState({ArrayPuesto:id})  
  this.setState({
    id_puestoUpdate:id.id_puesto,
    nombrepuestoUpdate:id.puesto,
    nivelUpdate:id.nivel,
    mandoUpdate:id.mando,
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

tablainicio(){
  this.setState({inicioPuesto:true})
  this.setState({inicioNiveles:false})
  this.setState({tablarenderPuesto:false})
}
tablaNiveles(){
  this.setState({inicioPuesto:false})
  this.setState({inicioNiveles:true})
  this.setState({tablarenderPuesto:false})
}
 tablaPuesto(){
  this.setState({inicioPuesto:false})
  this.setState({inicioNiveles:false})
  this.setState({tablarenderPuesto:true})
 }
  onSubmitBtn =(e)=>{
    let nombrePuesto = this.state.nombrePuesto.toUpperCase()
   if(nombrePuesto ){  
       axios({
      url: API,
      method: "post",
      data: {
        query: `
                mutation{
                  signupCatPuesto(data:"${[nombrePuesto]}"){  
                    message
                     } 
                }
                `
      }
    })
      .then((response) => { 
          console.log("esto es response",response)       
       if(response.data.data.signupCatPuesto.message === "registro exitoso"){
           swal({              
          title: "", 
          text:"Registro exitoso!",              
          icon: "success",
          button:false,
          timer: 1500
        });  
        this.setState({nombrePuesto:[]})          
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

    let id_puestoUpdate = this.state.id_puestoUpdate
    let nombrepuestoUpdate = this.state.nombrepuestoUpdate.toUpperCase()
    let nivelUpdate = this.state.nivelUpdate
    // let mandoUpdate = this.state.mandoUpdate

  // if( nombrepuestoUpdate && nivelUpdate && mandoUpdate){
    // updatePuesto(data:"${[id_puestoUpdate,nombrepuestoUpdate,nivelUpdate,mandoUpdate]}"){ 

    if( nombrepuestoUpdate ){
       axios({
      url: API,
      method: "post",
      data: {
        query: `
         mutation{
          updatePuesto(data:"${[id_puestoUpdate,nombrepuestoUpdate]}"){ 
           message
        } 
    }
    `
      }
    })     
      .then((response) => {   
        if(response.data.data.updatePuesto.message==="actualizacion exitosa"){
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
    
    
    // *****
    
   };

   onSubmitBtn = async (e)=>{ 
    let nombre = this.state.nombre.toUpperCase()
    let apellidos = this.state.apellidos.toUpperCase()
    let curp = this.state.curp.toUpperCase()
    let rfc = this.state.rfc.toUpperCase()
    let correo = this.state.correo
    let numEmpleado = this.state.numEmpleado
    let telefono = this.state.telefono
    let ext = this.state.ext
    let dependencia = this.state.dependencia
    let fechaAlta = this.state.fechaAlta
    let fechaBaja = this.state.fechaBaja
    let fechaNotificacionAlta = this.state.fechaNotificacionAlta
    let fechaNotificacionBaja = this.state.fechaNotificacionBaja
    let pass = this.state.pass         
    let fk_oficionas = this.state.fk_oficionas        
    let fk_area = this.state.fk_area
    let fk_puesto = this.state.fk_puesto
    let fk_personal = this.state.fk_personal
    
 if(fechaAlta && fechaBaja && fechaNotificacionAlta && nombre && apellidos && correo && numEmpleado && telefono && ext && dependencia && fechaAlta && pass && fk_oficionas && fk_area && fk_puesto){  
  await   axios({
    url: API,
    method: "post",
    data: {
      query: `
              mutation{
                 sigUpEmpleado(data:"${[nombre,apellidos,curp,rfc,correo,numEmpleado,telefono,ext,dependencia,pass,fk_oficionas,fk_area,fk_puesto,fk_personal]}"){  
                  message
                   } 
              }
              `
    }
  })
    .then((response) => {     
    }).catch((err) => {
      console.log("error", err.response);
    }); 
    axios({
      url: API,
      method: "post",
      data: {
        query: `
                mutation{
                signupDataFechanotificaciones(data:"${[fechaAlta,fechaBaja,fechaNotificacionAlta,fechaNotificacionBaja,numEmpleado]}"){  
                    message
                    } 
                }
                `
      }
    })
      .then(response => {  
      // if(response){
          swal({              
          title: "Registro exitoso!",               
          icon: "success",
          button:false,
          timer: 3000
        });  
      }).catch((err) => {
        console.log("error", err.response);
      });   
        window.location.reload() 
           
  }else{
      swal({
          text:"complete los campos requeridos",
          icon:"warning"
      })
  }
};


   onSubmitBtn3 =(e)=>{
    let fk_puesto = this.state.fk_Puesto
    let nivel = this.state.nivel.toUpperCase()
    // console.log("fk_puesto",fk_puesto,"nivel",nivel)
   if(fk_puesto && nivel ){  
       axios({
      url: API,
      method: "post",
      data: {
        query: `
                mutation{
                  sigupCatNiveles(data:"${[nivel,fk_puesto]}"){  
                    message
                     } 
                }
                `
      }
    })
      .then((response) => { 
          console.log("esto es response",response)       
       if(response.data.data.sigupCatNiveles.message === "registro exitoso"){
           swal({              
          title: "", 
          text:"Registro exitoso!",              
          icon: "success",
          button:false,          
        });  
        this.setState({nivel:[]})    
        // setTimeout(function(){
        //   window.location.reload()
        //    }, 1500);    
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


    render(){ 
      const { Option } = Select; 
      let formulario;
      let formularioNiveles;
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

      let titulo=<h5><strong>PUESTOS CEAV</strong></h5>
     
             if(this.state.inicioPuesto === true) {
              formulario =
              <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%"}}>
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  >
                    <Form onSubmitBtn={this.onSubmitBtn}>
                  <Form.Item label=" NOMBRE DEL PUESTO" required >
                    <Input style={{ width: 400 }} placeholder="puesto" id="nombrePuesto" name="nombrePuesto" type="text" onChange={this.onChangeInput} value={this.state.nombrePuesto}/>
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
            if(this.state.inicioNiveles === true){
              formularioNiveles=
              <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%"}}>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                >
                  <Form onSubmitBtn={this.onSubmitBtn3}>
                <Form.Item label="NOMBRE DEL PUESTO" required>
                  <Select
                   onChange={this.handleChange}
                   showSearch
                   style={{ width: 400 }}
                   placeholder="SELECCIONE un puesto"
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                   }
                   filterSort={(optionA, optionB) =>
                   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                   }   
                  >
                      { this.state.tablaPuesto.map(rows=>{
                          return (
                          <option value  = {rows.id_puesto} >{rows.puesto}</option>
                          )
                        })}
                  </Select>
               </Form.Item>


                <Form.Item label="NIVEL" required >
                  <Input style={{ width: 400 }} placeholder="nivel del puesto" id="nivel" name="nivel" type="text" onChange={this.onChangeInput3} value={this.state.nivel}/>
                </Form.Item> 
                <Form.Item>
                  <div className="text-center">                   
                          <Button className='ant-btnText' onClick={e=>this.onSubmitBtn3()} style={{ background: "#73d13d" }}>GUARDAR</Button> &nbsp;&nbsp;&nbsp;
                          {/* <Button className='ant-btnText' onClick={e=>this.onClear()} style={{background:"#40a9ff"}} >CANCELAR</Button> */}
                      </div> 
                  </Form.Item>
                  </Form>
              </Form> 
            </Card>
            }
         
         const columns = ["ID","PUESTO","NIVEL","EDITAR"]
       
     
 
         let data = this.state.tablaPuestoANDNiveles.map((rows)=>{
           botonEditar = <div>            
           <Button type="link" shape="circle" size="large"
             onClick={(e)=>this.editar(rows)}
             >
           <MDBIcon icon="user-edit" />
           </Button>
         </div>
           return([rows.id_puesto,rows.puesto,rows.nivel,botonEditar])
         })

         if(this.state.tablarenderPuesto === true){
            tablaFormulario=
              <Card>
                {/* <Table columns={columns} dataSource={data} /> */}
                <MUIDataTable    
                title={"PUESTOS Y NIVELES REGISTRADOS " }
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
              <MDBModalHeader toggle={this.toggle}>EDITAR PUESTO</MDBModalHeader>
              <MDBModalBody>
              <MDBContainer>
              <form onSubmit={this.onSubmitBtn2}>
                  <MDBRow>
                    <MDBCol style={{marginTop:"5%", marginBotton:"5%"}}>
                    {/* <form onSubmit={this.onSubmitBtn2}> */}
                <Row>
                  <Col xs="6">
                  <label htmlFor="defaultFormLoginPasswordEx"> <strong>PUESTO:</strong></label>
                             <input                                              
                                  id="nombrepuestoUpdate"
                                  type="text"
                                  name="nombrepuestoUpdate"
                                  onChange={this.onChangeInput2}
                                  value={this.state.nombrepuestoUpdate}
                                  className="form-control"
                                  />
                    
                    </Col>
                    <Col xs="6">       
                  <label htmlFor="defaultFormLoginPasswordEx"> <strong>NIVEL:</strong></label>
                              <input                                          
                                    id="nivelUpdate"
                                    type="text"
                                    name="nivelUpdate"
                                    onChange={this.onChangeInput2}
                                    value={this.state.nivelUpdate }
                                    className="form-control"
                                    
                                    />
                  </Col> 
                </Row>  
               
                <div style={{marginTop:"3%"}} className="text-center">
                    <MDBBtn outline color="secondary" size='sm' type="submit" >                   
                      Guardar
                    </MDBBtn>
                    <MDBBtn
                      outline color="danger"
                      size='sm'
                      onClick={e=>this.toggle()}                >
                    Cancelar
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
          REGISTRAR PUESTO 
          </Menu.Item>
          <Menu.Item key="mail"  icon={<EditOutlined />} onClick={e=>this.tablaNiveles()}>
          REGISTRAR NIVELES 
          </Menu.Item>
          <Menu.Item key="mail" icon={<IssuesCloseOutlined />} onClick={e=>this.tablaPuesto()}>
          INF.PUESTO
          </Menu.Item>
          </Menu>
          {formulario}
          {formularioNiveles}
          {tablaFormulario}
          {modal}
         </React.Fragment>
        )
    }
   
}export default catalogoPuesto;