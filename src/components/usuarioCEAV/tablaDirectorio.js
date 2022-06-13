import  React, {Component} from "react"
import { Table, Input, Button, Space,Tag, Card, Form as form} from 'antd';
import {MDBIcon,MDBContainer,MDBModal,MDBModalHeader,MDBRow,MDBBtn,MDBCol,MDBModalBody,MDBModalFooter} from 'mdbreact'
import axios from 'axios'
import {API} from '../Graphql/Graphql';
import MUIDataTable from "mui-datatables";
import swal from 'sweetalert'
import {Row,Col,Form} from 'reactstrap';
import { Select,Avatar } from 'antd';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


class Index extends Component{
  constructor(props){
    super(props)
    this.state={
      tablaEmpledos:[],
      modal:false,
      tablaInicio:true,
      dataID:[],
      nombreR:"",
      apellidosR:"",
      correoR:"",
      telefono:"",
      nombre:"",
    }
    this.toggle = this.toggle.bind(this) 
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  async componentWillMount(){
    // let array =  []    
    //  let fk_empresa =  localStorage.getItem("fk_empresa")
     await axios({
            url:API,
            method:'post',
            data:{
              query:`
                query{   
                  getTablaDataEmpleado(data:"${[""]}"){
                    id_empleado
                    nombre
                    apellidos
                    correo
                    numEmpleado
                    telefono
                    ext
                    dependencia
                    fechaAlta
                    fechaBaja
                    contrasena
                    statusEmpleado
                    fk_oficinas
                    fk_rol
                    fk_area
                    fk_puesto
                    curp
                    rfc
                    fechaNotificacion
                    fk_personal
                    id_oficina
                    nombreOficina
                    calle
                    colonia
                    codigoPostal
                    ciudad
                    estado
                    telefono1
                    telefono2
                    telefono3
                    telefono4 
                    telefono5
                    id_roles
                    usuario 
                    id_area
                    nombreArea
                    id_puesto
                    nivel
                    mando
                    message
                    } 
                }
                `  }           
             })
           .then(response => { 
          console.log("Data Empleado",response.data.data.getTablaDataEmpleado)
            // array.push(datos.data.data.getTablaDataEmpleado)
              this.setState({tablaEmpledos:response.data.data.getTablaDataEmpleado}) 
              // console.log("esto es la tabla empleados",this.state.tablaEmpledos)
            })
            .catch(err=>{
               console.log('error' ,err.response)
            })    
    }
    onChangeInput =(e)=>{
      const {id,value} = e.target;
      this.setState({
          [id]:value
      })
    } 


    onClear = () => {
      this.setState({          
          nombre:"",
          apellidos:"",
          correo:"",
          telefono:"",
          ext:"",
          areaAdscripcion:"",
          puesto:"",
          ubicacion:"",
          pass:""       
             
      });        
    } 

    
    render(){    
       let botonEliminar;
       let botonEditar;       
       let modal;

      const options={ 
        filterType:"drowpdawn",
        responsive: "stacked",
        print:false,
        download:false,
        viewColumns:false,
        elevation:0,
        selectableRows:"none",
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
      modal= 
      <MDBContainer>
            {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <Avatar                         
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaFTArrxmtH9X2WYwrT0uuV0unokHJxgjQVd0brsFH66n8_bxP48QSX3xREQPiM92Fkn0&usqp=CAU" />
              <MDBModalHeader toggle={this.toggle}>Actualizar Información</MDBModalHeader>
              <MDBModalBody>
                <label>nombre</label> 
                <input id= "nombre" name = "nombre" type="text"  value={this.state.nombre} onChange={this.onChangeInput}
    />
               
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>
                <MDBBtn color="primary">Guardar</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBContainer>

          const columns = ["ID","NOMBRE", "APELLIDOS", "AREA", "CORREO","TELEFONO","EXT.","UBICACIÓN","DEPARTAMNETO"];  
         let data1 = this.state.tablaEmpledos.map((rows)=>{  
     
                 
              return([rows.id_empleado,rows.nombre,rows.apellidos,rows.area,rows.correo,rows.telefono,rows.ext,rows.ubicacion])
             })  
 
      

         let tablaInicio = 
         <div>
           <Card  style={{marginTop:"1%",width:"95%", marginLeft:"2%"}}>  
           <MUIDataTable    
           title={"Directorio CEAV" }
           data={data1}
           columns={columns}
           options={options}
           />
           </Card> 
           </div>
        return(            
      <React.Fragment>
            {tablaInicio}           
            {modal}
            </React.Fragment>
        )
    }
}export default Index