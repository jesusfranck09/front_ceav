import React, {Component} from 'react'
import { Card,Form as form, Input, Button, Radio, Form } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select,Space,DatePicker,Menu } from 'antd';
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import swal from 'sweetalert';
import {MDBBtn}     from 'mdbreact'
import { MailOutlined } from '@ant-design/icons';
import MUIDataTable from "mui-datatables";

class catalogoArea extends Component{
    constructor(props){
        super(props)
        this.state={
            nombre:'',
            apellidos:'',
            correo:'',
            pass:'',
            tablaAdmin:[],
            inicioAdmin:true,
            tablarenderAdmin:false
        }
    }
    componentDidMount(){
      axios({
        url:API,
        method:'post',
        data:{
          query:`
            query{   
              getTablaAdmin(data:"${[]}"){
                id_admin
                nombre
                apellidos
                correo
                message
                } 
            }
            `  }           
         })
       .then(response => { 
          this.setState({tablaAdmin:response.data.data.getTablaAdmin}) 
        })
        .catch(err=>{
           console.log('error' ,err.response)
        }) 
    }
    onClear = ()=>{
        this.state = {
          nombre:'',
          apellidos:'',
          correo:'',
          pass:'',
        }       
    }

    onChangeInput = (e) =>{
        // console.log("esto es onChangeInput",e)
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    }
    
    tablainicio(){
      this.setState({inicioAdmin:true})
      this.setState({tablarenderAdmin:false})
    }
    tablaAdmin(){
      this.setState({inicioAdmin:false})
      this.setState({tablarenderAdmin:true})
    }

     onSubmitBtn =(e)=>{
       let nombre = this.state.nombre
       let apellidos = this.state.apellidos
       let correo = this.state.correo
       let pass = this.state.pass


       console.log("data a insertar",nombre,apellidos,correo,pass)
        
        if(nombre && apellidos && correo && pass){  
            axios({
           url: API,
           method: "post",
           data: {
             query: `
                     mutation{
                      signupDataAdmin(data:"${[nombre,apellidos,correo,pass]}"){  
                         message
                          } 
                     }
                     `
           }
         })
           .then((response) => { 
               console.log("esto es response",response)       
            if(response.data.data.signupDataAdmin.message === "Registro exitoso"){
                swal({              
               title: "", 
               text:"Registro exitoso!",              
               icon: "success",
               button:false,
               timer: 1500
             });  
            //  this.setState({tipoRoles:[]})          
           }else if(response.data.data.signupDataAdmin.message === "el usuario se encuntra registrado"){
            swal({
               title:"Error!",
               text: "El usuario ya se encuntra registrado",
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
      let formulario;
      let tablaFormulario;
      const { Option } = Select;
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

      let titulo=<h5><strong>Nuevo administrador de Ceav</strong></h5>
   if(this.state.inicioAdmin === true){
         formulario =         
        <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%"}}>
             <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
      <Form onSubmitBtn={this.onSubmitBtn}>
      <Form.Item label="NOMBRE(S)" required >
        <Input style={{ width: 400 }} placeholder="ejemplo.ceav.gob.mx" id="nombre" name="nombre" type="text" onChange={this.onChangeInput} value={this.state.nombre}/>
      </Form.Item> 
      <Form.Item label="APELLIDOS" required >
        <Input style={{ width: 400 }} placeholder="ejemplo.ceav.gob.mx" id="apellidos" name="apellidos" type="text" onChange={this.onChangeInput} value={this.state.apellidos}/>
      </Form.Item> 
      <Form.Item label="CORREO" required >
        <Input style={{ width: 400 }} placeholder="ejemplo.ceav.gob.mx" id="correo" name="correo" type="text" onChange={this.onChangeInput} value={this.state.correo}/>
      </Form.Item> 
      <Form.Item label="CONTRASEÑA" required >
        <Input style={{ width: 400 }} placeholder="****" id="pass" name="pass" type="text" onChange={this.onChangeInput} value={this.state.pass}/>
      </Form.Item>  
      {/* <Form.Item label="ROLES" required >
        <Input style={{ width: 400 }} placeholder="administrador" id="tipoRoles" name="tipoRoles" type="text" onChange={this.onChangeInput} value={this.state.tipoRoles}/>
      </Form.Item>  */}
      <Form.Item>
        <div className="text-center">                   
                <Button className='ant-btnText' onClick={e=>this.onSubmitBtn()} style={{ background: "#73d13d" }}>Guardar</Button> &nbsp;&nbsp;&nbsp;
                <Button className='ant-btnText' onClick={e=>this.onClear()} style={{background:"#40a9ff"}} >Cancelar</Button>
            </div> 
        </Form.Item>   
        </Form>     
    </Form> 
        </Card>
    }

    const columns = ["ID","NOMBRE","APELLIDO","CORREO"]
    let data = this.state.tablaAdmin.map((rows)=>{
     
        return([rows.id_admin,rows.nombre,rows.apellidos,rows.correo])
      })
      if(this.state.tablarenderAdmin === true){
      tablaFormulario=
      <Card>
        <MUIDataTable    
        title={"Areas registradas" }
        data={data}
        columns={columns}
        options={options}
        />
      </Card>
      }

        return(
            <React.Fragment>   
            <Menu mode="horizontal" className='menuSide' defaultSelectedKeys={['mail']}>
              <Menu.Item key="mail"  icon={<MailOutlined />} onClick={e=>this.tablainicio()}>
              REGISTRAR ADMINISTRADOR
              </Menu.Item>
              <Menu.Item key="mail" icon={<MailOutlined />} onClick={e=>this.tablaAdmin()}>
              INF.ADMINISTRADOR
              </Menu.Item>
              </Menu>
              {formulario}
              {tablaFormulario}              
            </React.Fragment>
        )
    }
    
}export default catalogoArea