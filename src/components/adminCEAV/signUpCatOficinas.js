import React, {Component} from 'react'
import { Card,Form as form, Input, Button, Select, Form,Menu } from 'antd'
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import swal from 'sweetalert';
import {Row,Col} from 'reactstrap'
import {MDBBtn,MDBRow,MDBCol,MDBIcon,MDBContainer,MDBModal,MDBModalHeader,MDBModalBody,MDBModalFooter } from 'mdbreact'
import MUIDataTable from "mui-datatables";
import { MailOutlined } from '@ant-design/icons';
import './sideNavAdmin.css'

class catalogoOficina extends Component{
    constructor(props){
        super(props)
        this.state={
            nombreOficina:'',
            calle:'',
            numExterior:'',
            numInterior:'',
            ciudad:'',
            colonia:'',
            // municipio:'',
            estado:'',
            cp:'',
            telefono1:'',
            telefono2:'',
            telefono3:'',
            telefono4:'',
            telefono5:'',
            referencia:'',
            tablaOficina:[],
            inicioOficina:true,
            tablarenderOficina:false,
            ArrayOficina:[],
            modal:false,
            id_oficinaUpdate:"",
            nombreOficinaUpdate:"",
            calleUpdate:"",
            numExteriorUpdate:"",
            numInteriorUpdate:"",
            ciudadUpdate:"",
            coloniaUpdate:"",
            // municipioUpdate:"",
            estadoUpdate:"",
            cpUpdate:"",
            telefono1Update:"",
            telefono2Update:"",
            telefono3Update:"",
            telefono4Update:"",
            telefono5Update:"",
            referenciaUpdate:"",
        }
        this.onClear = this.onClear.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount(){ 
      axios({
        url:API,
        method:'post',
        data:{
          query:`
            query{   
              getTablaOficinas(data:"${[]}"){
                id_oficina
                nombreOficina
                calle
                numExterior
                numInterior
                colonia
                codigoPostal
                ciudad
                estado
                telefono1
                telefono2
                telefono1
                telefono3
                telefono1
                telefono4
                telefono5
                referencia
                message
                } 
            }
            `  }           
         })
       .then(response => { 
      console.log("Data oficinas",response.data.data.getTablaOficinas)
          this.setState({tablaOficina:response.data.data.getTablaOficinas}) 
        })
        .catch(err=>{
           console.log('error' ,err.response)
        }) 
      }

    onClear = ()=>{
        this.state = {
            nombreOficina:'',
            calle:'',
            numExterior:'',
            numInterior:'',
            ciudad:'',
            colonia:'',
            municipio:'',
            estado:'',
            cp:'',
            telefono1:'',
            telefono2:'',
            telefono3:'',
            telefono4:'',
            telefono5:'',
            referencia:'',
            tablaOficina:[],
            inicioOficina:true,
            tablarenderOficina:false
        }       
    }
    tablainicio(){
     this.setState({inicioOficina:true})
     this.setState({tablarenderOficina:false})
    }
    tablaOficina(){
      this.setState({inicioOficina:false})
      this.setState({tablarenderOficina:true})
    }

    onChangeInput = (e) =>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    onChangeInput2 = (e) =>{
      const {id,value} = e.target;
      this.setState({
          [id]:value
      })
  }
  editar(id){ 
    this.setState({ArrayOficina:id})  
    this.setState({
      id_oficinaUpdate:id.id_oficina,
      nombreOficinaUpdate:id.nombreOficina,
      calleUpdate:id.calle,
      numExteriorUpdate:id.numExterior,
      numInteriorUpdate:id.numInterior,
      coloniaUpdate:id.colonia,
      cpUpdate:id.codigoPostal,
      ciudadUpdate:id.ciudad,
      estadoUpdate:id.estado,
      telefono1Update:id.telefono1,
      telefono2Update:id.telefono2,
      telefono3Update:id.telefono3,
      telefono4Update:id.telefono4,
      telefono5Update:id.telefono5,
      referenciaUpdate:id.referencia
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

     handleChange1(value){
         this.setState({estado:value})
     }
     onSubmitBtn =(e)=>{
       let nombreOficina = this.state.nombreOficina.toUpperCase()
         let calle = this.state.calle.toUpperCase()
         let numExterior = this.state.numExterior
         let numInterior = this.state.numInterior
         let ciudad = this.state.ciudad.toUpperCase()
         let colonia = this.state.colonia.toUpperCase()
        //  let municipio = this.state.municipio
         let estado = this.state.estado
         let codigoPostal = this.state.cp
         let telefono1 = this.state.telefono1
         let telefono2 = this.state.telefono2
         let telefono3 = this.state.telefono3
         let telefono4 = this.state.telefono4
         let telefono5 = this.state.telefono5
         let referencia = this.state.referencia
       console.log("data a insertar",nombreOficina,calle,ciudad,colonia,estado,codigoPostal,telefono1)
        
        if(nombreOficina && calle && numExterior && ciudad && colonia  && estado && codigoPostal,telefono1){  
            axios({
           url: API,
           method: "post",
           data: {
             query: `
                     mutation{
                      signupCatOficina(data:"${[nombreOficina,calle,numExterior,numInterior,colonia,codigoPostal,ciudad,estado,telefono1,telefono2,telefono3,telefono4,telefono5,referencia]}"){  
                         message
                          } 
                     }
                     `
           }
         })
           .then((response) => { 
               console.log("esto es response",response)       
            if(response.data.data.signupCatOficina.message === "registro exitoso"){
                swal({              
               title: "", 
               text:"Registro exitoso!",              
               icon: "success",
               button:false,
               timer: 1500
             });  
             this.setState({nombreOficina:[],calle:[],numExterior:[],numInterior:[],ciudad:[],colonia:[],municipio:[],estado:[],cp:[],telefono1:[],telefono2:[],telefono3:[],telefono4:[],telefono5:[],referencia:[]})          
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
        let id_oficinaUpdate = this.state.id_oficinaUpdate;
        let nombreOficinaUpdate = this.state.nombreOficinaUpdate.toUpperCase();
        let calleUpdate = this.state.calleUpdate.toUpperCase();
        let numExteriorUpdate = this.state.numExteriorUpdate;
        let numInteriorUpdate = this.state.numInteriorUpdate;
        let coloniaUpdate = this.state.coloniaUpdate.toUpperCase();
        let cpUpdate = this.state.cpUpdate;
        let ciudadUpdate = this.state.ciudadUpdate;
        let estadoUpdate = this.state.estadoUpdate;
        let telefono1Update = this.state.telefono1Update;
        let telefono2Update = this.state.telefono2Update;
        let telefono3Update = this.state.telefono3Update;
        let telefono4Update = this.state.telefono4Update;
        let telefono5Update = this.state.telefono5Update;
        let referenciaUpdate = this.state.referenciaUpdate

     
         if( nombreOficinaUpdate && calleUpdate && numExteriorUpdate  && coloniaUpdate && cpUpdate && ciudadUpdate && estadoUpdate && telefono1Update){
           axios({
          url: API,
          method: "post",
          data: {
            query: `
             mutation{
              updateOficina(data:"${[id_oficinaUpdate,nombreOficinaUpdate,calleUpdate,numExteriorUpdate,numInteriorUpdate,coloniaUpdate,cpUpdate,ciudadUpdate,estadoUpdate,telefono1Update,telefono2Update,telefono3Update,telefono4Update,telefono5Update,referenciaUpdate]}"){ 
               message
            } 
        }
        `
          }
        })     
          .then((response) => {   
            if(response.data.data.updateOficina.message==="actualizacion exitosa"){
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
      let titulo=<h5><strong>Oficinas de Ceav</strong></h5>    
      if(this.state.inicioOficina === true){
        formulario=         
        <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%", height:"50%"}}>
             <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
    <Form onSubmitBtn={this.onSubmitBtn}>
    <MDBRow>      
    <MDBCol>
      <Form.Item label="NOMBRE OFICINA" required >
        <Input style={{ width: 400 }} placeholder="Angel Urraza #728" id="nombreOficina" name="nombreOficina" type="text" onChange={this.onChangeInput} value={this.state.nombreOficina}/>
      </Form.Item>
      </MDBCol>
      <MDBCol>
      <Form.Item label="CALLE" required >
        <Input style={{ width: 400 }} placeholder="Angel Urraza #728" id="calle" name="calle" type="text" onChange={this.onChangeInput} value={this.state.calle}/>
      </Form.Item>
      </MDBCol>
      <MDBCol>
      <Form.Item label="NO. EXTERIOR" required >
        <Input style={{ width: 400 }} placeholder="Angel Urraza #728" id="numExterior" name="numExterior" type="text" onChange={this.onChangeInput} value={this.state.numExterior}/>
      </Form.Item>
      </MDBCol>
      <MDBCol>
      <Form.Item label="NO. INTERIOR"  >
        <Input style={{ width: 400 }} placeholder="Angel Urraza #728" id="numInterior" name="numInterior" type="text" onChange={this.onChangeInput} value={this.state.numInterior}/>
      </Form.Item>
      </MDBCol>
      <MDBCol>
      <Form.Item label="CODIGO POSTAL" required>
      <Input style={{ width: 400 }} placeholder="C.P" id="cp" name="cp" type="number" onChange={this.onChangeInput} value={this.state.cp} />
      </Form.Item> 
      </MDBCol>
      <MDBCol>
      <Form.Item label="COLONIA" required>
      <Input style={{ width: 400 }} placeholder="centro" id="colonia" name="colonia" type="text" onChange={this.onChangeInput} value={this.state.colonia} />
      </Form.Item>
      </MDBCol>
      <MDBCol>
        <Form.Item label="ESTADO" required>
        <Select
            onChange={this.handleChange1}
            showSearch
            style={{ width: 400 }}
            placeholder=" SELECCIONE SU ESTADO"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }> 
            <Option value="AGUASCALIENTES">AGUASCALIENTES</Option>
            <Option value="BAJA CALIFORNIA">BAJA CALIFORNIA</Option>
            <Option value="BAJA CALIFORNIA SUR">BAJA CALIFORNIA SUR</Option>
            <Option value="CAMPECHE">CAMPECHE</Option>
            <Option value="CHIAPAS">CHIAPAS</Option>
            <Option value="CHIHUAHUA">CHIHUAHUA</Option>
            <Option value="COAHUILA">COAHUILA</Option>
            <Option value="COLIMA">COLIMA</Option>
            <Option value="ESTADO DE MÉXICO">ESTADO DE MÉXICO</Option>
            <Option value="DURANGO">DURANGO</Option>
            <Option value="GUANAJUATO">GUANAJUATO</Option>
            <Option value="GUERRERO">GUERRERO</Option>
            <Option value="HIDALGO">HIDALGO</Option>
            <Option value="JALISCO">JALISCO</Option>
            <Option value="CIUDAD DE MEXICO">CIUDAD DE MEXICO</Option>
            <Option value="MICHOACÁN">MICHOACÁN</Option>
            <Option value="MORELOS">MORELOS</Option>
            <Option value="NAYARIT">NAYARIT</Option>
            <Option value="NUEVO LEÓN">NUEVO LEÓN</Option>
            <Option value="OAXACA">OAXACA</Option>
            <Option value="PUEBLA">PUEBLA</Option>
            <Option value="QUERÉTARO">QUERÉTARO</Option>
            <Option value="QUINTANA ROO">QUINTANA ROO</Option>
            <Option value="SAN LUIS POTOSÍ">SAN LUIS POTOSÍ</Option>
            <Option value="SINALOA">SINALOA</Option>
            <Option value="SONORA">SONORA</Option>
            <Option value="TABASCO">TABASCO</Option>
            <Option value="TAMAULIPAS">TAMAULIPAS</Option>
            <Option value="TLAXCALA">TLAXCALA</Option>
            <Option value="VERACRUZ DE IGNACION DE LA LLEVE">VERACRUZ DE IGNACION DE LA LLEVE</Option>
            <Option value="YUCATÁN">YUCATÁN</Option>
            <Option value="ZACATECAS">ZACATECAS</Option>        
        </Select>
        </Form.Item>
        </MDBCol>
        {/* +++++++++++++ */}
        <MDBCol>
        <Form.Item label="ESTADO" required>
        {/* <Select
         className="browser-default custom-select "
         type="select"
         name="estado"
         id="estado"
         onChange={this.handleChange1}
        //  value={this.state.id_oficinaUpdate}
         required
              >
          { this.state.arrayEstado.map(rows=>{
            return (
            <option value={rows.id_oficina}>{rows.nombreOficina }</option>
            )
          })} 
        </Select>  */}
        </Form.Item>  
        </MDBCol> 
        {/* ******** */}
        <MDBCol>
      <Form.Item label="MUNICIPIO/ALCALDIA" required>
      <Input style={{ width: 400 }} placeholder="cuidad de mexico" id="ciudad" name="ciudad" type="text" onChange={this.onChangeInput} value={this.state.ciudad} />
      </Form.Item>
      </MDBCol>
        <MDBCol>
      <Form.Item label="TELEFONO 1" required>
      <Input style={{ width: 400 }} placeholder="5510002000" id="telefono1" name="telefono1" type="number" onChange={this.onChangeInput} value={this.state.telefono1} />
      </Form.Item> 
      </MDBCol>
      <MDBCol>
      <Form.Item label="TELEFONO 2" >
      <Input style={{ width: 400 }} placeholder="5510002000" id="telefono2" name="telefono2" type="number" onChange={this.onChangeInput} value={this.state.telefono2} />
      </Form.Item> 
      </MDBCol>
      <MDBCol>
      <Form.Item label="TELEFONO 3" >
      <Input style={{ width: 400 }} placeholder="5510002000" id="telefono3" name="telefono3" type="number" onChange={this.onChangeInput} value={this.state.telefono3} />
      </Form.Item> 
      </MDBCol>
      <MDBCol>
      <Form.Item label="TELEFONO 4" >
      <Input style={{ width: 400 }} placeholder="5510002000" id="telefono4" name="telefono4" type="number" onChange={this.onChangeInput} value={this.state.telefono4} />
      </Form.Item>
      </MDBCol>
      <MDBCol> 
      <Form.Item label="TELEFONO 5" >
      <Input style={{ width: 400 }} placeholder="5510002000" id="telefono5" name="telefono5" type="number" onChange={this.onChangeInput} value={this.state.telefono5} />
      </Form.Item> 
      </MDBCol>
      <MDBCol style={{marginTop:"3%"}}>
      <Form.Item >
        <div className="text-center" >                   
                <Button className='ant-btnText' onClick={e=>this.onSubmitBtn()} style={{ background: "#73d13d" }}>Guardar</Button> &nbsp;&nbsp;&nbsp;
                <Button className='ant-btnText' onClick={e=>this.onClear()} style={{background:"#40a9ff"}} >Cancelar</Button>
            </div> 
      </Form.Item>
      </MDBCol>
      <MDBCol>
      </MDBCol>
      </MDBRow> 
    </Form>
    </Form> 
        </Card>
      }

      const columns = ["ID","OFICINA","CALLE","NO. EXTERIOR","C.P.","MUNICIPIO/ALCALDIA","ESTADO","EDITAR"]

  

      let data = this.state.tablaOficina.map((rows)=>{
        console.log("esto es rows",rows)
        botonEditar = <div>            
        <Button type="primary" shape="circle" size="large"
          onClick={(e)=>this.editar(rows)}
          >
        <MDBIcon icon="user-edit" />
        </Button>
      </div>
        return([rows.id_oficina,rows.nombreOficina,rows.calle,rows.numExterior,rows.codigoPostal,rows.ciudad,rows.estado,botonEditar])
      })

      if(this.state.tablarenderOficina === true){
      tablaFormulario=
        <Card>
        <MUIDataTable    
        title={"Puesto registrados" }
        data={data}
        columns={columns}
        options={options}
        />
      </Card>
      }
      modal=
      <div>
        <MDBContainer >
      <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" >
        <MDBModalHeader toggle={this.toggle}>EDITAR OFICINA</MDBModalHeader>
        <MDBModalBody>
        <MDBContainer>
        <form onSubmit={this.onSubmitBtn2}>
            <MDBRow>
              <MDBCol style={{marginTop:"5%", marginBotton:"5%"}}>
              {/* <form onSubmit={this.onSubmitBtn2}> */}
          <Row>
            <Col xs="12">
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>NOMBRE OFICINA:</strong></label>
                       <input                                              
                            id="nombreOficinaUpdate"
                            type="text"
                            name="nombreOficinaUpdate"
                            onChange={this.onChangeInput2}
                            value={this.state.nombreOficinaUpdate}
                            className="form-control"                            
                            />
              
              </Col>
              <Col xs="12">       
            <label htmlFor="defaultFormLoginPasswordEx"> <strong>CALLE </strong></label>
                        <input                                          
                              id="calleUpdate"
                              type="text"
                              name="calleUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.calleUpdate }
                              className="form-control"                              
                              />
            </Col> 
          </Row>
          <Row>
          <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>NO.EXTERIOR </strong></label>
              <input                                          
                              id="numExteriorUpdate"
                              type="text"
                              name="numExteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.numExteriorUpdate }
                              className="form-control"                              
                              />
            </Col>       
            <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>NO.INTERIOR </strong></label>
              <input                                          
                              id="numInteriorUpdate"
                              type="text"
                              name="numInteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.numInterior }
                              className="form-control"                              
                              />
            </Col>          
          </Row>   
          <Row>
          <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>MUNICIPIO/ALCALDIA </strong></label>
              <input                                          
                              id="numExteriorUpdate"
                              type="text"
                              name="numExteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.numExteriorUpdate }
                              className="form-control"                              
                              />
            </Col>       
            <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>COLONIA</strong></label>
              <input                                          
                              id="numInteriorUpdate"
                              type="text"
                              name="numInteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.coloniaUpdate }
                              className="form-control"                              
                              />
            </Col>          
          </Row> 
          <Row>
          <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>CODIGO POSTAL</strong></label>
              <input                                          
                              id="numExteriorUpdate"
                              type="text"
                              name="numExteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.cpUpdate }
                              className="form-control"                              
                              />
            </Col>       
            <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" ><strong>ESTADO</strong></label>
              {/* <input                                          
                              id="numInteriorUpdate"
                              type="text"
                              name="numInteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.numInteriorUpdate }
                              className="form-control"                              
                              /> */}
               <select
                    className="browser-default custom-select"
                    type="text"
                    name="estadoUpdate"
                    id="estadoUpdate"
                    onChange={this.onChangeInput2}
                    value={this.state.estadoUpdate}
                >
                  <option value="disable">Tipo de Contacto *</option>
                  <option value="PAGO">Pago</option>
                  <option value="ADMINISTRATIVO">Administrativo</option>
                  <option value="TÉCNICO">Técnico</option>
                </select> 
            </Col>          
          </Row>
          <Row>
          <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>TELEFONO 1</strong></label>
              <input                                          
                              id="numExteriorUpdate"
                              type="text"
                              name="numExteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.telefono1Update }
                              className="form-control"                              
                              />
            </Col>       
            <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>TELEFONO 2</strong></label>
              <input                                          
                              id="numInteriorUpdate"
                              type="text"
                              name="numInteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.telefono2Update }
                              className="form-control"                              
                              />
            </Col>          
          </Row>
          <Row>
          <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>TELEFONO 3 </strong></label>
              <input                                          
                              id="numExteriorUpdate"
                              type="text"
                              name="numExteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.telefono3Update }
                              className="form-control"                              
                              />
            </Col>       
            <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>TELEFONO 4</strong></label>
              <input                                          
                              id="numInteriorUpdate"
                              type="text"
                              name="numInteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.telefono4Update }
                              className="form-control"                              
                              />
            </Col>          
          </Row>
          <Row>
          <Col xs="6">
              <label htmlFor="defaultFormLoginPasswordEx" > <strong>TELEFONO 5 </strong></label>
              <input                                          
                              id="numExteriorUpdate"
                              type="text"
                              name="numExteriorUpdate"
                              onChange={this.onChangeInput2}
                              value={this.state.telefono5Update }
                              className="form-control"                              
                              />
            </Col>
          </Row>
         
          <div style={{marginTop:"3%"}} className="text-center">
              <MDBBtn color="info" type="submit" >                   
                Guardar
              </MDBBtn>
              <MDBBtn
                color="danger"
                onClick={e=>this.toggle()}                >
              Cancelar
              </MDBBtn>                   
          </div>  
        </MDBCol>
      </MDBRow>
      </form>
    </MDBContainer>  
    (...)           
        </MDBModalBody>
        <MDBModalFooter>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
      </div>
        return(
              <React.Fragment>   
              <Menu mode="horizontal" className='menuSide' defaultSelectedKeys={['mail']}>
                <Menu.Item key="mail"  icon={<MailOutlined />} onClick={e=>this.tablainicio()}>
                REGISTRAR OFICINA
                </Menu.Item>
                <Menu.Item key="mail" icon={<MailOutlined />} onClick={e=>this.tablaOficina()}>
                INF.OFICINAS
                </Menu.Item>
                </Menu>
                {formulario}
                {tablaFormulario}
                {modal}
              </React.Fragment>
        )
    }
    
}export default catalogoOficina