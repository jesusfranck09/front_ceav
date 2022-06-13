import React, {Component} from 'react'
import { Card,Form , Input, Button,Select,Menu } from 'antd'
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import swal from 'sweetalert';
import MUIDataTable from "mui-datatables";
import { Row,Col,Form as form } from 'reactstrap'
import { EditOutlined,IssuesCloseOutlined } from '@ant-design/icons';
import './sideNavAdmin.css'
import { MDBBtn,MDBIcon,MDBContainer,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter,MDBRow,MDBCol } from 'mdbreact';

class catalogoArea extends Component{
    constructor(props){
        super(props)
        this.state={
            area:'',
            nomeclatura:'',
            numSerie:'',
            tablaArea:[],            
            inicioArea:true,
            tablarenderArea:false,
            ArrayArea:[],
            modal:false,  
            id_areaUpdate:"",     
            nombreAreaUpdate:"",
            nomeclaturaUpdate:"",
            numSerieUpdate:"",
            

        }
        this.toggle = this.toggle.bind(this)
        this.onChangeInput2 = this.onChangeInput2.bind(this)
    }
    componentDidMount(){
      axios({
        url:API,
        method:'post',
        data:{
          query:`
            query{   
              getTablaArea(data:"${[]}"){
                id_area
                nomeclatura
                numSerie
                nombreArea
                message
                } 
            }
            `  }           
         })
       .then(response => { 
          this.setState({tablaArea:response.data.data.getTablaArea}) 
        })
        .catch(err=>{
           console.log('error' ,err.response)
        }) 
    }

    tablainicio(){
      this.setState({inicioArea:true})
      this.setState({tablarenderArea:false})
    }
    tablaArea(){
      this.setState({inicioArea:false})
      this.setState({tablarenderArea:true})
    }
    onClear = ()=>{
        this.state = {
           area:'' 
        }       
    }
    onChangeInput = (e) =>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    onChangeInput2 = (e) => {
      const { id, value } = e.target;  
      console.log("e",e.target)   
      this.setState({
        [id]: value
      });
    };
    editar(id){ 
      this.setState({ArrayArea:id})  
      this.setState({
        id_areaUpdate:id.id_area,
        nombreAreaUpdate:id.nombreArea,
        nomeclaturaUpdate:id.nomeclatura,
        numSerieUpdate:id.numSerie  
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
         let area = this.state.area.toUpperCase()
         let nomeclatura = this.state.nomeclatura.toUpperCase()
         let numSerie = this.state.numSerie
        if(area){  
            axios({
           url: API,
           method: "post",
           data: {
             query: `
                     mutation{
                        signupCatArea(data:"${[nomeclatura,numSerie,area]}"){  
                         message
                          } 
                     }
                     `
           }
         })
           .then((response) => { 
               console.log("esto es response",response)       
            if(response.data.data.signupCatArea.message === "registro exitoso"){
                swal({              
               title: "", 
               text:"Registro exitoso!",              
               icon: "success",
               button:false,
               timer: 1500
             });  
             this.setState({area:[],nomeclatura:[],numSerie:[]})          
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
        let id_areaUpdate = this.state.id_areaUpdate
        let nombreAreaUpdate = this.state.nombreAreaUpdate.toUpperCase();
        let nomeclaturaUpdate = this.state.nomeclaturaUpdate.toUpperCase();
        let numSerieUpdate = this.state.numSerieUpdate
         if( nombreAreaUpdate ){
           axios({
          url: API,
          method: "post",
          data: {
            query: `
             mutation{
              updateArea(data:"${[id_areaUpdate,nomeclaturaUpdate,numSerieUpdate,nombreAreaUpdate]}"){ 
               message
            } 
        }
        `
          }
        })     
          .then((response) => {   
            if(response.data.data.updateArea.message==="actualizacion exitosa"){
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
                text:"Algo salió mal.",
                icon:"error",
                buttons:false,
                timer:1000
              })
            }         
            
          })
          .catch((err) => {
            console.log("error", err.response);           
          }); 
        } else{
          swal({
            title:"",
            text:"Algo salió mal, por favor complete todos los campos  requeridos *",
            icon:"warning",
            buttons:false,
            timer:1000
          })
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

 let titulo=<h5><strong>ÁREA DE ADSCRIPCIÓN CEAV</strong></h5>
     if(this.state.inicioArea === true){
        formulario =         
        <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%"}}>
          <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
            >
            <Form onSubmitBtn={this.onSubmitBtn}>
              <Form.Item label="NOMBRE DEL ÁREA" required >
                <Input style={{ width: 400 }}  id="area" name="area" type="text" onChange={this.onChangeInput} value={this.state.area}/>
              </Form.Item>  
             <Form.Item label="NOMECLARUTA">
                <Input style={{ width: 400 }}  id="nomeclatura" name="nomeclatura" type="text" onChange={this.onChangeInput} value={this.state.nomeclatura}/>
              </Form.Item>   
              <Form.Item label="NUMERO DE SERIE">
                <Input style={{ width: 400 }}  id="numSerie" name="numSerie" type="text" onChange={this.onChangeInput} value={this.state.numSerie}/>
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

      const columns = ["ID","NOMECLATURA","NO. SERIE","ÁREA","EDITA"]
      let data = this.state.tablaArea.map((rows)=>{
         botonEditar = <div>            
                <Button type="link" shape="circle" size="large"
                  onClick={(e)=>this.editar(rows)}
                  >
                <MDBIcon icon="user-edit" />
                </Button>
              </div>
          return([rows.id_area,rows.nomeclatura,rows.numSerie,rows.nombreArea,botonEditar])
        })
        if(this.state.tablarenderArea === true){
        tablaFormulario=
        <Card>
          <MUIDataTable    
           title={"ÁREAS REGISTRADAS" }
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
          <MDBModalHeader toggle={this.toggle}>EDITAR ÁREA</MDBModalHeader>
          <MDBModalBody>
          <MDBContainer>
          <form onSubmit={this.onSubmitBtn2}>
              <MDBRow>
                <MDBCol style={{marginTop:"5%", marginBotton:"5%"}}>
                {/* <form onSubmit={this.onSubmitBtn2}> */}
            <Row>
              <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx"> <strong>NOMECLATURA:</strong></label>
                         <input                                              
                              id="nomeclaturaUpdate"
                              type="text"
                              name="nomeclaturaUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.nomeclaturaUpdate}
                              className="form-control"                              
                              />
                
                </Col>
                <Col xs="6">       
              <label htmlFor="defaultFormLoginPasswordEx"> <strong>NO. SERIE: </strong></label>
                          <input                                          
                                id="numSerieUpdate"
                                type="text"
                                name="numSerieUpdate"
                                onChange={this.onChangeInput2}
                                value={this.state.numSerieUpdate }
                                className="form-control"                                
                                />
              </Col> 
            </Row>
            <Row>
            <Col xs="12">
            <div className="form-group">       
                <label htmlFor="defaultFormLoginPasswordEx" > <strong>NOMBRE ÁREA: </strong></label>
                            <textarea
                              className="form-control"
                              id="nombreAreaUpdate"
                              type="text"
                              name="nombreAreaUpdate"
                              rows="5"
                              value={this.state.nombreAreaUpdate }
                              onChange={this.onChangeInput2}
                            />
            </div>
              </Col>            
            </Row>   
           
            <div style={{marginTop:"3%"}} className="text-center">
                <MDBBtn outline color="secondary"  type="submit" size='sm'>GUARDAR</MDBBtn>
                <MDBBtn outline color="danger" size='sm' onClick={e=>this.toggle()} >CANCELAR</MDBBtn>
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
            REGISTRAR ÁREA
            </Menu.Item>
            <Menu.Item key="mail" icon={<IssuesCloseOutlined />} onClick={e=>this.tablaArea()}>
            INF. ÁREA
            </Menu.Item>
            </Menu>
            {formulario}
            {tablaFormulario}
            {modal}
          </React.Fragment>
        )
    }
    
}export default catalogoArea