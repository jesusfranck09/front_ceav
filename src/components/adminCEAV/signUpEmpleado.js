import React, {Component} from 'react'
import { Card,Form as form, Input, Button, Radio, Form } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select,Space,DatePicker } from 'antd';
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import swal from 'sweetalert';
import {MDBBtn, MDBRow,MDBCol} from 'mdbreact'

class signUpEmpleado extends Component{
    constructor(props){
        super(props)
        this.state={
            nombre:'',
            apellidos:'',
            correo:'',
            curp:'',
            rfc:'',
            numEmpleado:'',
            telefono:'',
            ext:'',
            dependencia:'',
            fechaAlta:'',
            fechaBaja:'',
            fechaNotificacionAlta:'',
            fechaNotificacionBaja:'',
            pass:'',
            fk_oficionas:'',
            fk_area:'',
            fk_puesto:'',
            fk_personal:'',
            
        }
         this.capturarFechaA = this.capturarFechaA.bind(this)
         this.capturarFechaB = this.capturarFechaB.bind(this)
         this.handleChange1 = this.handleChange1.bind(this)
         this.handleChange2 = this.handleChange2.bind(this)
         this.handleChange3 = this.handleChange3.bind(this)
         this.handleChange4 = this.handleChange4.bind(this)
         this.fNotificacion = this.fNotificacion.bind(this)
         this.fNotificacionB = this.fNotificacionB.bind(this)

    }

    onChangeInput =(e)=>{
        const {id,value} = e.target;
        this.setState({
            [id]:value
        })
    } 
    handleChange1(value) { 
      this.setState({fk_oficionas:value}) 
  }
    handleChange2(value) { 
        this.setState({fk_area:value})
    }
    handleChange3(value) { 
        this.setState({fk_puesto:value}) 
    }
    handleChange4(value){
      this.setState({fk_personal:value})
    }
    capturarFechaA(e){
      if(e){
        let fechaAltaEmp = e._d.toString();
        this.setState({fechaAlta:fechaAltaEmp})
      }
    }
    capturarFechaB(e){
      if(e){
        let fechaBajaEmp = e._d.toString();
        this.setState({fechaBaja:fechaBajaEmp})
      }
    }

    fNotificacion(e){
      if(e){
        let fechaN = e._d.toString();
        this.setState({fechaNotificacionAlta:fechaN})
      }
    }
    fNotificacionB(e){
      if(e){
        let fechaNB = e._d.toString();
        this.setState({fechaNotificacionBaja:fechaNB})
      }
    }


    onClear = () => {
        this.setState({
          nombre:'',
          apellidos:'',
          correo:'',
          curp:'',
          rfc:'',
          numEmpleado:'',
          telefono:'',
          ext:'',
          dependencia:'',
          fechaAlta:'',
          fechaBaja:'',
          fechaNotificacion:'',
          pass:'',
        });        
      } 

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

    render(){
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
        const { Option } = Select;

        let titulo = <center><h5><strong>Registro de Empleado</strong></h5></center>
       
        let formulario=         
        <Card title={titulo} style={{marginTop:"2%", width:"95%",marginLeft:"3%", height:"50%"}}>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        >  
        <Form onSubmit={this.onSubmitBtn}>   
        <MDBRow>   
        <MDBCol><Form.Item label="FECHA DE ALTA" required> <DatePicker  style={{ width: 400 }} placeholder="10/01/2022" onChange={this.capturarFechaA} format={dateFormatList} /></Form.Item></MDBCol>
        <MDBCol><Form.Item label="FECHA DE BAJA"> <DatePicker style={{ width: 400 }} placeholder="20/04/2023" onChange={this.capturarFechaB} format={dateFormatList} /></Form.Item></MDBCol>
        <MDBCol><Form.Item label="FECHA DE NOTIFICACI??N"> <DatePicker style={{ width: 400 }} placeholder="10/01/2022" onChange={this.fNotificacion} format={dateFormatList} /></Form.Item></MDBCol>    
        <MDBCol>        
        <Form.Item  label="NOMBRE(S)" required >
            <Input style={{ width:400 }} placeholder="NOMBRE(S)" id="nombre" type="text" name="nombre" onChange={this.onChangeInput} value={this.state.nombre} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="APELLIDOS" required>
            <Input style={{ width: 400 }} placeholder="APELLIDOS" id="apellidos" type="text" name="apellidos" onChange={this.onChangeInput} value={this.state.apellidos} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="CURP" required>
            <Input style={{ width: 400 }} placeholder="16 digitos" id="curp" type="text" name="curp" onChange={this.onChangeInput} value={this.state.curp} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="RFP" required>
          <Input style={{ width: 400 }} placeholder="16 digitos" id="rfc" type="text" name="rfc" onChange={this.onChangeInput} value={this.state.rfc} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="CORREO" required>
          <Input style={{ width: 400 }} placeholder="ejemplo@ceav.gob.mx" id="correo" type="email" name="correo" onChange={this.onChangeInput} value={this.state.correo} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="N??m. EMPLEADO" required>
          <Input style={{ width: 400 }} placeholder="" id="numEmpleado" type="number" name="numEmpleado" onChange={this.onChangeInput} value={this.state.numEmpleado} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="TELEFONO" required>
          <Input style={{ width: 400 }} placeholder="(55) 1000 2000" id="telefono" type="number" name="telefono" onChange={this.onChangeInput} value={this.state.telefono} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="EXT." required>
          <Input style={{ width: 400 }} placeholder="0000" id="ext" type="number" name="ext" onChange={this.onChangeInput} value={this.state.ext} />
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="DEPENDENCIA" required>
          <Input style={{ width: 400 }} placeholder="CEAV" id="dependencia" type="text" name="dependencia" onChange={this.onChangeInput} value={this.state.dependencia} />
        </Form.Item>
        </MDBCol>       
        <MDBCol>
        <Form.Item  label="CONTRASE??A" id="pass" type="password" name="pass" onChange={this.onChangeInput} value={this.state.pass} required >
        <Input.Password style={{ width: 400 }} placeholder="****" />
      </Form.Item>
      </MDBCol>
      <MDBCol>
      <Form.Item label="OfICINA" required>
        <Select
        onChange={this.handleChange1}
            showSearch
            style={{ width: 400 }}
            placeholder=" SELECCIONE SU OFICINA"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
        >
            <Option value="1">Oficina Central</Option>
            <Option value="2">CAV Veracruz</Option>
            <Option value="3">CAV Chihuahua</Option>            
        </Select>
        </Form.Item>
        </MDBCol>
        <MDBCol>
        <Form.Item label="AREA DE ADSCRIPCI??N" required>
        <Select
        onChange={this.handleChange2}
            showSearch
            style={{ width: 400 }}
            placeholder=" SELECCIONE EL AREA DE ADSCRIPCI??N"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
        >
            <Option value="1">OFICINA DE LA COMISIONADA EJECUTIVA</Option>
            <Option value="2">DIRECCI??N DE COMUNICACI??N SOCIAL</Option>
            <Option value="3">OFICIAL??A DE PARTES</Option>
            <Option value="4">UNIDAD DE G??NERO, ??TICA E INCLUSI??N</Option>
            <Option value="5">UNIDAD DE TRANSPARENCIA</Option>
            <Option value="6">DIRECCI??N GENERAL DE VINCULACI??N Y REPARACIONES COLECTIVAS</Option>
            <Option value="7">DIRECCI??N GENERAL DE LA ASESOR??A JUR??DICA FEDERAL</Option>
            <Option value="8">DIRECCI??N GENERAL DE EVALUACI??N Y CONSOLIDACI??N</Option>
            <Option value="9">DIRECCI??N GENERAL DE DESARROLLO INSTITUCIONAL Y REGISTRO NACIONAL DE V??CTIMAS</Option>
            <Option value="10">DIRECCI??N GENERAL DE ATENCI??N INDIVIDUAL A V??CTIMAS</Option>
            <Option value="11">DIRECCI??N GENERAL DE ASUNTOS JUR??DICOS</Option>
            <Option value="12">DIRECCI??N GENERAL DE ADMINISTRACI??N Y FINANZAS</Option>
            <Option value="13">CENTRO DE ATENCI??N INTEGRAL AGUASCALIENTES</Option>
            <Option value="14">CENTRO DE ATENCI??N INTEGRAL BAJA CALIFORNIA</Option>
            <Option value="15">CENTRO DE ATENCI??N INTEGRAL BAJA CALIFORNIA SUR</Option>
            <Option value="16">CENTRO DE ATENCI??N INTEGRAL CAMPECHE</Option>
            <Option value="17">CENTRO DE ATENCI??N INTEGRAL CHIAPAS</Option>
            <Option value="18">CENTRO DE ATENCI??N INTEGRAL CHIHUAHUA</Option>
            <Option value="19">CENTRO DE ATENCI??N INTEGRAL COAHUILA</Option>
            <Option value="20">CENTRO DE ATENCI??N INTEGRAL COLIMA</Option>
            <Option value="21">CENTRO DE ATENCI??N INTEGRAL DURANGO</Option>
            <Option value="22">CENTRO DE ATENCI??N INTEGRAL ESTADO DE M??XICO</Option>
            <Option value="23">CENTRO DE ATENCI??N INTEGRAL GUANAJUATO</Option>
            <Option value="24">CENTRO DE ATENCI??N INTEGRAL GUERRERO</Option>
            <Option value="25">CENTRO DE ATENCI??N INTEGRAL HIDALGO</Option>
            <Option value="26">CENTRO DE ATENCI??N INTEGRAL JALISCO</Option>
            <Option value="27">CENTRO DE ATENCI??N INTEGRAL MICHOAC??N</Option>
            <Option value="28">CENTRO DE ATENCI??N INTEGRAL MORELOS</Option>
            <Option value="29">CENTRO DE ATENCI??N INTEGRAL NAYARIT</Option>
            <Option value="30">CENTRO DE ATENCI??N INTEGRAL NUEVO LE??N</Option>
            <Option value="31">CENTRO DE ATENCI??N INTEGRAL OAXACA</Option>
            <Option value="32">CENTRO DE ATENCI??N INTEGRAL PUEBLA</Option>
            <Option value="33">CENTRO DE ATENCI??N INTEGRAL QUER??TARO</Option>
            <Option value="34">CENTRO DE ATENCI??N INTEGRAL QUINTANA ROO</Option>
            <Option value="35">CENTRO DE ATENCI??N INTEGRAL SAN LUIS POTOS??</Option>
            <Option value="36">CENTRO DE ATENCI??N INTEGRAL SINALOA</Option>
            <Option value="37">CENTRO DE ATENCI??N INTEGRAL SONORA</Option>
            <Option value="38">CENTRO DE ATENCI??N INTEGRAL TABASCO</Option>
            <Option value="39">CENTRO DE ATENCI??N INTEGRAL TAMAULIPAS</Option>
            <Option value="40">CENTRO DE ATENCI??N INTEGRAL TLAXCALA</Option>
            <Option value="41">CENTRO DE ATENCI??N INTEGRAL VERACRUZ</Option>
            <Option value="42">CENTRO DE ATENCI??N INTEGRAL YUCAT??N</Option>
            <Option value="43">CENTRO DE ATENCI??N INTEGRAL ZACATECAS</Option>
        </Select>
        </Form.Item>
        </MDBCol>
        <MDBCol>            
        <Form.Item label="DENOMINACI??N DEL PUESTO" required>
        <Select
            onChange={this.handleChange3}
            showSearch
            style={{ width: 400 }}
            placeholder="SELECCIONE LA DENOMINACI??N DEL PUESTO"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
        >             
        <Option value="1">COMISI??N EJECUTIVA</Option>      
        <Option value="2">DIRECCI??N DE ??REA</Option> 
        <Option value="3">SUBDIRECCI??N DE ??REA</Option> 
        <Option value="4">JEFATURA DE DEPARTAMENTO</Option> 
        <Option value="5">ENLACE</Option> 
        <Option value="6">ASISTENTE T??CNICO</Option> 
        <Option value="7">DIRECCI??N GENERAL</Option> 
        <Option value="8">PROFESIONAL EJECUTIVO</Option> 
        </Select>   
        </Form.Item> 
        </MDBCol>
        <MDBCol>
        <Form.Item label="PERSONAL" required>
        <Select
            onChange={this.handleChange4}
            showSearch
            style={{ width: 400 }}
            placeholder="SELECCIONE LA DENOMINACI??N DEL PERSONAL"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
        >             
        <Option value="1">EVENTUAL</Option>      
        <Option value="2">PERSONAL</Option>         
        </Select>   
        </Form.Item> 
        </MDBCol>
        <MDBCol> 
        <Form.Item style={{marginTop:"8%"}}>
        <div className="text-center">                   
            <Button  onClick={e=>this.onSubmitBtn()} style={{ background: "#73d13d" }}>Guardar</Button> &nbsp;&nbsp;&nbsp;
            <Button  onClick={e=>this.onClear()} style={{background:"#40a9ff"}} >Cancelar</Button>
        </div> 
        </Form.Item>
        </MDBCol>   
        </MDBRow>  
        </Form>
        </Form>       
        </Card>
        
        return(
            <React.Fragment>
                  {formulario}              
            </React.Fragment>
      
        )
    }

}export default signUpEmpleado